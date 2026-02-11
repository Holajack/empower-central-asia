#!/bin/bash
# ============================================================
# scan-hardcoded.sh - Deterministic Scanner for HikeWise
#
# Uses known coordinates and text labels to navigate every screen.
# Much more reliable than dynamic discovery since all taps are pre-mapped.
#
# Navigation map (from hierarchy analysis):
#   Landing page: "Continue as Jacken" button
#   Home: Focus button (center), profile icon (top-right 389,94)
#   Bottom tabs: Settings/gear (70,867), Nora/paw (215,867), Leaderboard/trophy (360,867)
#   Back button: top-left ~(40,89) on sub-screens
# ============================================================

set -uo pipefail

# macOS timeout shim
if ! command -v timeout &>/dev/null; then
  if command -v gtimeout &>/dev/null; then
    timeout() { gtimeout "$@"; }
  else
    timeout() { shift; "$@"; }
  fi
fi

log() { echo "[scanner][$(date '+%H:%M:%S')] $1"; }

# --- Config ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DASHBOARD="${DASHBOARD_URL:-http://localhost:3847}"
SCAN_ID="${SCAN_ID:-scan-$(date +%s)}"
DISCOVERY_DIR="$BASE_DIR/data/discovery"
SCREENSHOTS_DIR="$BASE_DIR/data/screenshots"
TEMP_DIR="$BASE_DIR/maestro/flows/_scanner_temp"
SCAN_TIMEOUT=30
EXPO_DEV_URL="${EXPO_DEV_URL:-exp://10.2.1.233:8081}"
APP_MODE="${APP_MODE:-expo-go}"
DEVICE_TYPE="${DEVICE_TYPE:-auto}"
DEVICE_UDID="${DEVICE_UDID:-}"
EFFECTIVE_APP_ID="host.exp.Exponent"

mkdir -p "$DISCOVERY_DIR" "$SCREENSHOTS_DIR" "$TEMP_DIR"

# Device detection
MAESTRO_DEVICE_FLAG=""
MAESTRO_BRIDGE_PORT="${MAESTRO_BRIDGE_PORT:-6001}"
if [ "$DEVICE_TYPE" = "physical" ] && [ -n "$DEVICE_UDID" ]; then
  MAESTRO_DEVICE_FLAG="--driver-host-port $MAESTRO_BRIDGE_PORT --device $DEVICE_UDID"
elif [ "$DEVICE_TYPE" = "auto" ]; then
  if lsof -i :6001 &>/dev/null; then
    TMPJSON=$(mktemp)
    if xcrun devicectl list devices --json-output "$TMPJSON" 2>/dev/null; then
      DEVICE_UDID=$(python3 -c "
import json
with open('$TMPJSON') as f:
    data = json.load(f)
for d in data.get('result',{}).get('devices',[]):
    hw = d.get('hardwareProperties',{})
    conn = d.get('connectionProperties',{})
    if conn.get('transportType') == 'wired':
        print(hw.get('udid',''))
        break
" 2>/dev/null || true)
    fi
    rm -f "$TMPJSON"
    if [ -n "$DEVICE_UDID" ]; then
      MAESTRO_DEVICE_FLAG="--driver-host-port $MAESTRO_BRIDGE_PORT --device $DEVICE_UDID"
      DEVICE_TYPE="physical"
    fi
  fi
fi

log "=== HikeWise Hardcoded Scanner ==="
log "  Scan ID: $SCAN_ID"
log "  Device:  $DEVICE_TYPE ${DEVICE_UDID:+(${DEVICE_UDID:0:8}...)}"
log "  Expo:    $EXPO_DEV_URL"

# --- Helpers ---
progress() {
  local phase=$1 total=$2 msg=$3 status=$4
  curl -s -X POST "$DASHBOARD/api/scanner/progress" \
    -H "Content-Type: application/json" \
    -d "{\"phase\":$phase,\"totalPhases\":$total,\"message\":\"$msg\",\"status\":\"$status\"}" > /dev/null 2>&1 || true
}

run_flow() {
  local yaml_path="$1"
  local flow_out
  # shellcheck disable=SC2086
  flow_out=$(timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG test "$yaml_path" 2>&1) || {
    local ec=$?
    local fail=$(echo "$flow_out" | grep -i "FAILED" | head -1)
    [ -n "$fail" ] && log "    [FAIL] $fail"
    return $ec
  }
  return 0
}

write_yaml() {
  local name="$1" content="$2"
  local path="$TEMP_DIR/${name}.yaml"
  cat > "$path" << EOF
appId: ${EFFECTIVE_APP_ID}
---
$content
EOF
  echo "$path"
}

capture_hierarchy() {
  local name="$1"
  local raw="$DISCOVERY_DIR/${SCAN_ID}_hierarchy_${name}.raw"
  local out="$DISCOVERY_DIR/${SCAN_ID}_hierarchy_${name}.json"
  # shellcheck disable=SC2086
  if timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG hierarchy > "$raw" 2>/dev/null; then
    if [ -s "$raw" ]; then
      sed '1s/^None: //' "$raw" | sed '/^$/d' > "$out"
      rm -f "$raw"
      echo "$out"
      return 0
    fi
  fi
  rm -f "$raw"
  return 1
}

capture_screenshot() {
  local name="$1"
  # Maestro's takeScreenshot appends .png automatically, so don't include .png in the name
  local ss_base="${SCAN_ID}_${name}"
  local ss_yaml=$(write_yaml "ss_${name}" "- takeScreenshot: $ss_base")
  # shellcheck disable=SC2086
  timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG test "$ss_yaml" > /dev/null 2>&1 || true
  # Find the screenshot (Maestro saves as name.png in cwd or nearby)
  local found=$(find "$BASE_DIR" -maxdepth 2 -name "${ss_base}*" -newer "$ss_yaml" 2>/dev/null | head -1)
  if [ -n "$found" ]; then
    mv "$found" "$SCREENSHOTS_DIR/${ss_base}.png" 2>/dev/null || true
    echo "${ss_base}.png"
    return 0
  fi
  echo ""
}

# Navigate back by finding and tapping the back button in top-left
go_back() {
  local name="${1:-back}"
  local raw_hier
  # shellcheck disable=SC2086
  raw_hier=$(timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG hierarchy 2>/dev/null | sed '1s/^None: //' | sed '/^$/d')
  if [ -n "$raw_hier" ]; then
    local back_pos
    back_pos=$(echo "$raw_hier" | python3 -c "
import json, sys, re
data = json.loads(sys.stdin.read().strip())
def find_all(node):
    results = []
    attrs = node.get('attributes', {})
    b = attrs.get('bounds', '')
    m = re.match(r'\[(\d+),(\d+)\]\[(\d+),(\d+)\]', b)
    if m:
        x1,y1,x2,y2 = int(m.group(1)),int(m.group(2)),int(m.group(3)),int(m.group(4))
        w,h = x2-x1, y2-y1
        if x1 < 80 and y1 > 40 and y1 < 150 and 20 <= w <= 150 and 20 <= h <= 80:
            results.append(f'{(x1+x2)//2},{(y1+y2)//2}')
    for child in node.get('children', []):
        results.extend(find_all(child))
    return results
c = find_all(data)
print(c[0] if c else '')
" 2>/dev/null)
    if [ -n "$back_pos" ]; then
      log "    ← Back ($back_pos)"
      local y=$(write_yaml "$name" "- tapOn:
    point: \"${back_pos}\"
- waitForAnimationToEnd")
      run_flow "$y"
      sleep 2
      return 0
    fi
  fi
  # Fallback 2: Try tapping "Home" text (for screens like Nora with "< Home" button)
  log "    ← Back (tap 'Home' text fallback)"
  local y2=$(write_yaml "${name}_home_tap" "- tapOn: \"Home\"
- waitForAnimationToEnd")
  if run_flow "$y2"; then
    sleep 2
    return 0
  fi
  # Fallback 3: swipe from left edge
  log "    ← Back (swipe fallback)"
  local y=$(write_yaml "${name}_swipe" "- swipe:
    start: \"1%,50%\"
    end: \"80%,50%\"
    duration: 300
- waitForAnimationToEnd")
  run_flow "$y"
  sleep 2
}

# Scan one screen: capture hierarchy + screenshot
scan_one() {
  local name="$1"
  log "  📸 Capturing: $name"
  capture_hierarchy "$name" > /dev/null 2>&1
  capture_screenshot "$name" > /dev/null 2>&1
}

# Tap by text
tap_text() {
  local text="$1" wait="${2:-3}"
  log "  👆 Tap: \"$text\""
  local y=$(write_yaml "tap_$(echo "$text" | tr ' ' '_' | tr -cd 'a-zA-Z0-9_')" "- tapOn: \"${text}\"
- waitForAnimationToEnd")
  run_flow "$y"
  sleep "$wait"
}

# Tap by coordinate
tap_point() {
  local x="$1" y_coord="$2" label="$3" wait="${4:-3}"
  log "  👆 Tap: $label ($x,$y_coord)"
  local y=$(write_yaml "tap_$(echo "$label" | tr ' ' '_' | tr -cd 'a-zA-Z0-9_')" "- tapOn:
    point: \"${x},${y_coord}\"
- waitForAnimationToEnd")
  run_flow "$y"
  sleep "$wait"
}

# Scroll down
scroll_down() {
  local name="${1:-scroll}"
  local y=$(write_yaml "scroll_$name" "- scroll:
    direction: DOWN
- waitForAnimationToEnd")
  run_flow "$y" || true
  sleep 1
}

TOTAL_PHASES=6
SCREEN_COUNT=0

# ============================================================
# PHASE 1: Launch Expo Go → Navigate to HikeWise
# ============================================================
log ""
log "=== PHASE 1/$TOTAL_PHASES: Launch HikeWise via Expo Go ==="
progress 1 "$TOTAL_PHASES" "Launching app" "starting"

# Launch Expo Go
LAUNCH_YAML=$(write_yaml "launch" "- launchApp:
    clearState: false
- waitForAnimationToEnd
- extendedWaitUntil:
    visible: .*
    timeout: 10000")
run_flow "$LAUNCH_YAML" || true
sleep 3

# Check if HikeWise is already loaded or we're in Expo Go
LAUNCH_HIER=$(capture_hierarchy "launch_check")
SCREEN_STATE="unknown"
if [ -n "$LAUNCH_HIER" ]; then
  SCREEN_STATE=$(python3 - "$LAUNCH_HIER" << 'PYEOF'
import json, sys
with open(sys.argv[1]) as f:
    data = json.loads(f.read().strip())
def find_texts(node):
    texts = []
    attrs = node.get("attributes", {})
    text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
    if text: texts.append(text)
    for child in node.get("children", []): texts.extend(find_texts(child))
    return texts
all_text = " ".join(find_texts(data))
hikewise_markers = ["Continue as Jacken", "Focus Starts Here", "John F. Kennedy", "Weekly Focus Goal"]
expo_markers = ["Recently opened", "Development servers", "Enter URL manually", "Diagnostics"]
hw = any(m in all_text for m in hikewise_markers)
expo = any(m in all_text for m in expo_markers)
if hw and not expo: print("hikewise")
elif expo: print("expo")
else: print("unknown")
PYEOF
  )
  log "  Screen state: $SCREEN_STATE"
fi

if [ "$SCREEN_STATE" = "expo" ]; then
  # Navigate Expo Go to HikeWise
  log "  Tapping 'HikeWise' in Expo Go recents..."
  TAP_HW=$(write_yaml "tap_hw" "- tapOn: \"HikeWise\"
- waitForAnimationToEnd")
  run_flow "$TAP_HW" || true
  log "  Waiting for JS bundle to load..."
  sleep 12

  # Verify
  LAUNCH_HIER2=$(capture_hierarchy "launch_check_2")
  if [ -n "$LAUNCH_HIER2" ]; then
    SCREEN_STATE=$(python3 - "$LAUNCH_HIER2" << 'PYEOF2'
import json, sys
with open(sys.argv[1]) as f:
    data = json.loads(f.read().strip())
def find_texts(node):
    texts = []
    attrs = node.get("attributes", {})
    text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
    if text: texts.append(text)
    for child in node.get("children", []): texts.extend(find_texts(child))
    return texts
all_text = " ".join(find_texts(data))
if "Continue as Jacken" in all_text or "Focus Starts Here" in all_text or "John F. Kennedy" in all_text:
    print("hikewise")
else:
    print("unknown")
PYEOF2
    )
    log "  After tap: $SCREEN_STATE"
  fi
fi

if [ "$SCREEN_STATE" != "hikewise" ] && [ "$SCREEN_STATE" != "expo" ]; then
  # Try openLink as fallback
  log "  Trying openLink: $EXPO_DEV_URL"
  LINK_YAML=$(write_yaml "openlink" "- openLink: ${EXPO_DEV_URL}
- waitForAnimationToEnd")
  run_flow "$LINK_YAML" || true
  sleep 12
fi

# Clean up check files
rm -f "$DISCOVERY_DIR/${SCAN_ID}_hierarchy_launch_check"*.json 2>/dev/null
rm -f "$DISCOVERY_DIR/${SCAN_ID}_hierarchy_launch_check"*.raw 2>/dev/null

log "  Phase 1 complete"

# ============================================================
# PHASE 2: Landing page → Login
# ============================================================
log ""
log "=== PHASE 2/$TOTAL_PHASES: Landing page ==="
progress 2 "$TOTAL_PHASES" "Landing page" "scanning"

scan_one "landing"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

# Tap "Continue as Jacken"
tap_text "Continue as Jacken" 5

# Wait specifically for the Home screen Focus button
WAIT_YAML=$(write_yaml "wait_home" "- extendedWaitUntil:
    visible: \"Focus\"
    timeout: 15000")
run_flow "$WAIT_YAML" || true
sleep 2

log "  Phase 2 complete"

# ============================================================
# PHASE 3: Home screen
# ============================================================
log ""
log "=== PHASE 3/$TOTAL_PHASES: Home screen ==="
progress 3 "$TOTAL_PHASES" "Home screen" "scanning"

scan_one "home"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

# Scroll down to see more home content
scroll_down "home"
scan_one "home_scrolled"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

log "  Phase 3 complete"

# ============================================================
# PHASE 4: Bottom navigation tabs
# ============================================================
log ""
log "=== PHASE 4/$TOTAL_PHASES: Bottom tabs (Settings, Nora, Leaderboard) ==="
progress 4 "$TOTAL_PHASES" "Bottom tabs" "scanning"

# --- Profile (top-right icon from Home) ---
log "  --- Profile ---"
tap_point 389 94 "profile_icon" 3
scan_one "profile"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

for i in 1 2 3; do
  scroll_down "profile_$i"
  scan_one "profile_scroll_$i"
  SCREEN_COUNT=$((SCREEN_COUNT + 1))
done

go_back "profile_back"
sleep 1

# --- Settings tab (bottom-left gear icon at 70,867) ---
# Settings opens as a MODAL overlay, so must close it before other tabs
log "  --- Settings Tab ---"
tap_point 70 867 "settings_tab" 3
scan_one "settings"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

for i in 1 2 3; do
  scroll_down "settings_$i"
  scan_one "settings_scroll_$i"
  SCREEN_COUNT=$((SCREEN_COUNT + 1))
done

# Close Settings modal (X button in top-left)
log "  Closing Settings modal..."
go_back "close_settings"
sleep 1

# --- Nora tab (bottom-center paw icon at 215,867) ---
log "  --- Nora Tab ---"
tap_point 215 867 "nora_tab" 3
scan_one "nora"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

scroll_down "nora"
scan_one "nora_scrolled"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

# Nora is full-screen (covers bottom nav) — must go back to Home first
log "  Going back from Nora to Home..."
go_back "nora_back"
sleep 1

# --- Leaderboard tab (bottom-right trophy at 360,867) ---
log "  --- Leaderboard Tab ---"
tap_point 360 867 "leaderboard_tab" 3
scan_one "leaderboard"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

scroll_down "leaderboard"
scan_one "leaderboard_scrolled"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

# Leaderboard may also be full-screen — go back to Home
log "  Going back from Leaderboard to Home..."
go_back "leaderboard_back"
sleep 1

log "  Phase 4 complete"

# ============================================================
# PHASE 5: Focus session screen (don't start a session, just view)
# ============================================================
log ""
log "=== PHASE 5/$TOTAL_PHASES: Focus session screen ==="
progress 5 "$TOTAL_PHASES" "Focus screen" "scanning"

# Tap the Focus button on home
tap_text "Focus" 3
scan_one "focus_session"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

# Don't tap "Go" — that would start a timer. Just capture what's visible.
scroll_down "focus"
scan_one "focus_scrolled"
SCREEN_COUNT=$((SCREEN_COUNT + 1))

# Go back from focus
go_back "focus_back"

log "  Phase 5 complete"

# ============================================================
# PHASE 6: Compile report
# ============================================================
log ""
log "=== PHASE 6/$TOTAL_PHASES: Compiling report ==="
progress 6 "$TOTAL_PHASES" "Compiling" "finishing"

# Count actual files
HIER_COUNT=$(ls "$DISCOVERY_DIR/${SCAN_ID}_hierarchy_"*.json 2>/dev/null | wc -l | tr -d ' ')
SS_COUNT=$(ls "$SCREENSHOTS_DIR/${SCAN_ID}_"*.png 2>/dev/null | wc -l | tr -d ' ')

# Build report
python3 << PYEOF
import json, os, glob

scan_id = "$SCAN_ID"
disc_dir = "$DISCOVERY_DIR"
ss_dir = "$SCREENSHOTS_DIR"

screens = []
for hier_file in sorted(glob.glob(f"{disc_dir}/{scan_id}_hierarchy_*.json")):
    name = os.path.basename(hier_file).replace(f"{scan_id}_hierarchy_", "").replace(".json", "")
    if name.startswith("launch_check"):
        continue

    # Count elements
    elem_count = [0]
    texts = []
    try:
        with open(hier_file) as f:
            data = json.loads(f.read().strip())
        def count(node):
            elem_count[0] += 1
            attrs = node.get("attributes", {})
            text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
            if text and len(text) > 2 and len(text) < 80:
                texts.append(text)
            for child in node.get("children", []):
                count(child)
        count(data)
    except:
        pass

    # Find matching screenshot
    ss = ""
    for ext in ["*.png", "*.png.png"]:
        matches = glob.glob(f"{ss_dir}/{scan_id}_{name}{ext}")
        if matches:
            ss = os.path.basename(matches[0])
            break

    screens.append({
        "name": name.replace("_", " ").title(),
        "hierarchyFile": os.path.basename(hier_file),
        "screenshot": ss,
        "elementCount": elem_count[0],
        "textSamples": texts[:10],
    })

report = {
    "scanId": scan_id,
    "totalScreens": len(screens),
    "totalHierarchyFiles": $HIER_COUNT,
    "totalScreenshots": $SS_COUNT,
    "screens": screens,
}

report_path = f"{disc_dir}/{scan_id}_report.json"
with open(report_path, "w") as f:
    json.dump(report, f, indent=2)

print(f"Report: {len(screens)} screens, {$HIER_COUNT} hierarchies, {$SS_COUNT} screenshots")
PYEOF

log ""
log "=== SCAN COMPLETE ==="
log "  Screens captured: $SCREEN_COUNT"
log "  Hierarchy files: $HIER_COUNT"
log "  Screenshots: $SS_COUNT"
log "  Report: $DISCOVERY_DIR/${SCAN_ID}_report.json"

# Clean up temp files
rm -rf "$TEMP_DIR" 2>/dev/null

progress 7 "$TOTAL_PHASES" "Complete" "done"
exit 0
