#!/bin/bash
# ============================================================
# scan-app.sh - Deep Discovery Scanner for HikeWise
#
# Systematically scans every screen of the HikeWise app running
# on a physical iPhone via Expo Go. Uses Maestro hierarchy
# captures and screenshots to build a complete map of the app.
#
# Scan phases:
#   1. Launch app via Expo Go
#   2. Handle landing/login screen ("Continue as Jacken")
#   3. Capture home screen and discover bottom tabs
#   4. Navigate each bottom tab and capture
#   5. Explore profile area (top-right icon)
#   6. Explore settings
#   7. Deep scan sub-screens within each tab
#   8. Compile discovery report
#
# Environment variables:
#   DASHBOARD_URL - Dashboard HTTP endpoint (default: http://localhost:3847)
#   APP_ID        - App bundle ID (default: com.hikewise.app)
#   SCAN_ID       - Unique scan identifier (auto-generated if not set)
#   DEVICE_TYPE   - physical | simulator | auto
#   DEVICE_UDID   - Device UDID
#   APP_MODE      - expo-go | development-build
#   EXPO_DEV_URL  - Expo dev server URL (e.g. exp://10.2.1.233:8081)
# ============================================================

set -uo pipefail

# macOS doesn't have `timeout` — use gtimeout from coreutils or a built-in fallback
if ! command -v timeout &>/dev/null; then
  if command -v gtimeout &>/dev/null; then
    timeout() { gtimeout "$@"; }
  else
    # Simple fallback: just run the command without a timeout
    timeout() { shift; "$@"; }
  fi
fi

# --- Logging (defined first so it can be used everywhere) ---
log() {
  echo "[scanner][$(date '+%H:%M:%S')] $1"
}

# --- Configuration ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DASHBOARD="${DASHBOARD_URL:-http://localhost:3847}"
APP_ID="${APP_ID:-com.hikewise.app}"
SCAN_ID="${SCAN_ID:-scan-$(date +%s)}"
DISCOVERY_DIR="$BASE_DIR/data/discovery"
SCREENSHOTS_DIR="$BASE_DIR/data/screenshots"
TEMP_DIR="$BASE_DIR/maestro/flows/_scanner_temp"
PARSER="$SCRIPT_DIR/parse-hierarchy.py"
SCAN_TIMEOUT=30  # seconds per Maestro command
NAV_WAIT=3       # seconds to wait after navigation (physical devices are slower)

# Device detection: physical iPhone vs simulator
DEVICE_TYPE="${DEVICE_TYPE:-auto}"
DEVICE_UDID="${DEVICE_UDID:-}"
DEVICE_NAME="${DEVICE_NAME:-}"

# Auto-detect device if not specified
if [ "$DEVICE_TYPE" = "auto" ] || [ -z "$DEVICE_UDID" ]; then
  # Use JSON output to get the real hardware UDID (not CoreDevice identifier)
  TMPJSON=$(mktemp /tmp/devices.XXXX.json)
  if xcrun devicectl list devices --json-output "$TMPJSON" 2>/dev/null; then
    REAL_UDID=$(python3 -c "
import json
with open('$TMPJSON') as f:
    data = json.load(f)
devices = data.get('result',{}).get('devices',[])
for d in devices:
    hw = d.get('hardwareProperties',{})
    conn = d.get('connectionProperties',{})
    if conn.get('transportType') == 'wired':
        print(hw.get('udid',''))
        break
" 2>/dev/null || true)
    REAL_NAME=$(python3 -c "
import json
with open('$TMPJSON') as f:
    data = json.load(f)
devices = data.get('result',{}).get('devices',[])
for d in devices:
    conn = d.get('connectionProperties',{})
    if conn.get('transportType') == 'wired':
        print(d.get('name') or d.get('hardwareProperties',{}).get('marketingName','iPhone'))
        break
" 2>/dev/null || true)
    rm -f "$TMPJSON"

    if [ -n "$REAL_UDID" ]; then
      DEVICE_TYPE="physical"
      DEVICE_UDID="$REAL_UDID"
      DEVICE_NAME="${REAL_NAME:-Physical iPhone}"
    else
      DEVICE_TYPE="simulator"
      DEVICE_UDID=""
      DEVICE_NAME="Simulator"
    fi
  else
    rm -f "$TMPJSON"
    DEVICE_TYPE="simulator"
    DEVICE_UDID=""
    DEVICE_NAME="Simulator"
  fi
fi

# Maestro device flag
# Physical devices need the maestro-ios-device bridge (--driver-host-port 6001)
MAESTRO_DEVICE_FLAG=""
MAESTRO_BRIDGE_PORT="${MAESTRO_BRIDGE_PORT:-6001}"
if [ "$DEVICE_TYPE" = "physical" ] && [ -n "$DEVICE_UDID" ]; then
  MAESTRO_DEVICE_FLAG="--driver-host-port $MAESTRO_BRIDGE_PORT --device $DEVICE_UDID"
fi

# Expo Go support
APP_MODE="${APP_MODE:-expo-go}"
EXPO_DEV_URL="${EXPO_DEV_URL:-}"

# Effective appId for Maestro flows
EFFECTIVE_APP_ID="$APP_ID"
if [ "$APP_MODE" = "expo-go" ]; then
  EFFECTIVE_APP_ID="host.exp.Exponent"
fi

# Auto-detect Expo dev server URL if not set
if [ "$APP_MODE" = "expo-go" ] && [ -z "$EXPO_DEV_URL" ]; then
  LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || echo "")
  if [ -n "$LOCAL_IP" ] && lsof -i :8081 -t > /dev/null 2>&1; then
    EXPO_DEV_URL="exp://${LOCAL_IP}:8081"
    log "Auto-detected local Expo dev server: $EXPO_DEV_URL"
  else
    log "WARNING: No Expo server found. Set EXPO_DEV_URL in dashboard Config."
  fi
elif [ "$APP_MODE" = "expo-go" ] && [ -n "$EXPO_DEV_URL" ]; then
  log "Using configured Expo URL: $EXPO_DEV_URL"
fi

mkdir -p "$DISCOVERY_DIR" "$SCREENSHOTS_DIR" "$TEMP_DIR"

# --- State: accumulate screens into a temp JSON file ---
SCREENS_FILE="$TEMP_DIR/_screens.json"
echo "[]" > "$SCREENS_FILE"
TOTAL_SCREENS=0
SUCCESSFUL=0
FAILED=0

# Track visited screens to avoid duplicates
VISITED_SCREENS=""

# --- Progress reporting ---
progress() {
  local step="$1"
  local total="$2"
  local label="$3"
  local status="${4:-scanning}"
  curl -s -X POST "$DASHBOARD/api/scanner/progress" \
    -H "Content-Type: application/json" \
    -d "{\"scanId\":\"$SCAN_ID\",\"step\":$step,\"total\":$total,\"label\":\"$label\",\"status\":\"$status\"}" \
    > /dev/null 2>&1 || true
}

# --- Cleanup on exit ---
cleanup() {
  log "Cleaning up temp files..."
  rm -rf "$TEMP_DIR"
  mkdir -p "$TEMP_DIR"
}
trap cleanup EXIT

# ============================================================
# CORE HELPERS
# ============================================================

# Write a mini Maestro YAML (actions on current screen, no launch)
write_mini_yaml() {
  local name="$1"
  local content="$2"
  local yaml_path="$TEMP_DIR/${name}.yaml"
  cat > "$yaml_path" << EOF
appId: ${EFFECTIVE_APP_ID}
---
$content
EOF
  echo "$yaml_path"
}

# Write the launch YAML (used once at start)
write_launch_yaml() {
  local yaml_path="$TEMP_DIR/_launch.yaml"
  if [ "$APP_MODE" = "expo-go" ] && [ -n "$EXPO_DEV_URL" ]; then
    # Launch Expo Go and navigate to HikeWise via recently opened list
    # openLink is unreliable on physical devices, so we tap the app name instead
    cat > "$yaml_path" << EOF
appId: host.exp.Exponent
---
- launchApp:
    clearState: false
- waitForAnimationToEnd
- extendedWaitUntil:
    visible: .*
    timeout: 10000
EOF
  else
    cat > "$yaml_path" << EOF
appId: ${APP_ID}
---
- launchApp
- waitForAnimationToEnd
EOF
  fi
  echo "$yaml_path"
}

# Run a mini Maestro YAML flow
run_mini_flow() {
  local yaml_path="$1"
  local flow_output
  # shellcheck disable=SC2086
  flow_output=$(timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG test "$yaml_path" 2>&1) || {
    local exit_code=$?
    # Log failures so we can debug navigation issues
    local failed_step=$(echo "$flow_output" | grep -i "FAILED" | head -1)
    if [ -n "$failed_step" ]; then
      log "    [flow] $failed_step"
    fi
    return $exit_code
  }
  # Log success summary
  local completed_count=$(echo "$flow_output" | grep -c "COMPLETED" || true)
  log "    [flow] $completed_count steps completed"
  return 0
}

# Navigate back on iOS.
# pressKey:back and swipe gestures don't work reliably on physical iOS devices.
# Instead, find and tap the back arrow button in the top-left area of the screen.
go_back() {
  local name="${1:-goback}"

  # First: try to find back button from current hierarchy
  local raw_hier
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
        text = (attrs.get('text') or attrs.get('accessibilityText') or '').strip()
        rid = (attrs.get('resource-id') or '').strip()
        # Back button: small element in top-left, tappable
        if x1 < 80 and y1 > 40 and y1 < 150 and 20 <= w <= 80 and 20 <= h <= 80:
            results.append({'cx': (x1+x2)//2, 'cy': (y1+y2)//2, 'text': text, 'id': rid})
    for child in node.get('children', []):
        results.extend(find_all(child))
    return results
candidates = find_all(data)
# Pick the first small element in top-left (back arrow)
if candidates:
    c = candidates[0]
    print(f'{c[\"cx\"]},{c[\"cy\"]}')
else:
    print('')
" 2>/dev/null)

    if [ -n "$back_pos" ]; then
      log "    [back] Tapping back button at $back_pos"
      local back_yaml=$(write_mini_yaml "$name" "- tapOn:
    point: \"${back_pos}\"
- waitForAnimationToEnd")
      run_mini_flow "$back_yaml"
      sleep 1
      return 0
    fi
  fi

  # Fallback: try swipe from left edge
  log "    [back] No back button found, trying swipe"
  local swipe_yaml=$(write_mini_yaml "${name}_swipe" "- swipe:
    start: \"1%,50%\"
    end: \"80%,50%\"
    duration: 300
- waitForAnimationToEnd")
  run_mini_flow "$swipe_yaml"
  sleep 1
}

# Check if screen changed by comparing key text elements
get_screen_fingerprint() {
  local hier_file="$1"
  [ -f "$hier_file" ] && [ -s "$hier_file" ] || return 1
  python3 - "$hier_file" << 'FPEOF'
import json, sys
with open(sys.argv[1]) as f:
    data = json.loads(f.read().strip())
def find_texts(node):
    texts = []
    attrs = node.get("attributes", {})
    text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
    if text and len(text) > 2 and len(text) < 60:
        texts.append(text)
    for child in node.get("children", []):
        texts.extend(find_texts(child))
    return texts
texts = find_texts(data)
# Return first 5 meaningful texts as a fingerprint
print("|".join(texts[:5]))
FPEOF
}

# Capture hierarchy for the current screen
# Physical devices output JSON (with "None: " prefix), simulators output XML
capture_hierarchy() {
  local screen_name="$1"
  local raw_file="$DISCOVERY_DIR/${SCAN_ID}_hierarchy_${screen_name}.raw"
  local output_file="$DISCOVERY_DIR/${SCAN_ID}_hierarchy_${screen_name}.json"

  # shellcheck disable=SC2086
  if timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG hierarchy > "$raw_file" 2>/dev/null; then
    if [ -s "$raw_file" ]; then
      # Strip "None: " prefix and leading blank lines (physical device JSON output)
      sed '1s/^None: //' "$raw_file" | sed '/^$/d' > "$output_file"
      rm -f "$raw_file"
      echo "$output_file"
      return 0
    fi
  fi

  # Retry once
  sleep 2
  # shellcheck disable=SC2086
  if timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG hierarchy > "$raw_file" 2>/dev/null; then
    if [ -s "$raw_file" ]; then
      sed '1s/^None: //' "$raw_file" | sed '/^$/d' > "$output_file"
      rm -f "$raw_file"
      echo "$output_file"
      return 0
    fi
  fi

  rm -f "$raw_file"
  echo ""
  return 1
}

# Take a screenshot using correct appId
capture_screenshot() {
  local screen_name="$1"
  local filename="${SCAN_ID}_${screen_name}.png"
  local filepath="$SCREENSHOTS_DIR/$filename"

  if [ "$DEVICE_TYPE" = "physical" ] && [ -n "$DEVICE_UDID" ]; then
    local ss_yaml="$TEMP_DIR/_screenshot.yaml"
    cat > "$ss_yaml" << SSEOF
appId: ${EFFECTIVE_APP_ID}
---
- takeScreenshot: ${filepath}
SSEOF
    # shellcheck disable=SC2086
    if timeout "$SCAN_TIMEOUT" maestro $MAESTRO_DEVICE_FLAG test "$ss_yaml" > /dev/null 2>&1; then
      if [ -f "$filepath" ]; then
        echo "$filename"
        return 0
      fi
    fi
  else
    if xcrun simctl io booted screenshot "$filepath" 2>/dev/null; then
      echo "$filename"
      return 0
    fi
  fi
  echo ""
  return 1
}

# Parse hierarchy file (JSON or XML) to structured JSON
parse_elements() {
  local hier_file="$1"
  if [ ! -f "$hier_file" ] || [ ! -s "$hier_file" ]; then
    echo '{"totalElements":0,"textElements":[],"testIds":[],"buttons":[],"inputFields":[]}'
    return
  fi

  # Detect format: JSON starts with { or [, XML starts with <
  # Skip leading whitespace/newlines to find the real first character
  local first_char=$(sed '/^[[:space:]]*$/d' "$hier_file" | head -c 1)
  if [ "$first_char" = "{" ] || [ "$first_char" = "[" ]; then
    # JSON hierarchy from physical device
    python3 - "$hier_file" << 'PYEOF'
import json, sys

with open(sys.argv[1]) as f:
    data = json.load(f)

text_elements = []
test_ids = []
buttons = []
input_fields = []
total = [0]
seen_text = set()
seen_ids = set()

def walk(node):
    total[0] += 1
    attrs = node.get("attributes", {})
    text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
    test_id = (attrs.get("resource-id") or attrs.get("testId") or "").strip()
    enabled = attrs.get("enabled", "false") == "true"
    focused = attrs.get("focused", "false") == "true"

    # Parse bounds "[x1,y1][x2,y2]"
    bounds = attrs.get("bounds", "")

    if text and text not in seen_text and len(text) < 500:
        seen_text.add(text)
        text_elements.append(text)

    if test_id and test_id not in seen_ids:
        seen_ids.add(test_id)
        test_ids.append(test_id)

    # Buttons: enabled elements with text
    if text and enabled:
        buttons.append({"text": text, "testId": test_id or None, "enabled": enabled})

    for child in node.get("children", []):
        walk(child)

walk(data)
print(json.dumps({
    "totalElements": total[0],
    "textElements": text_elements,
    "testIds": test_ids,
    "buttons": buttons,
    "inputFields": input_fields
}))
PYEOF
  else
    # XML hierarchy from simulator - use existing parser
    python3 "$PARSER" "$hier_file" 2>/dev/null
  fi
}

# Sanitize a name for use as a filename
safe_name() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g' | sed 's/^_//;s/_$//'
}

# Check if a screen was already visited
is_visited() {
  local name="$1"
  echo "$VISITED_SCREENS" | grep -qF "|${name}|"
}

# Mark a screen as visited
mark_visited() {
  local name="$1"
  VISITED_SCREENS="${VISITED_SCREENS}|${name}|"
}

# ============================================================
# SCAN & RECORD A SCREEN
# Captures hierarchy + screenshot, parses elements, appends
# to the screens JSON file.
# Args: screen_name navigated_via
# ============================================================
scan_screen() {
  local screen_name="$1"
  local navigated_via="$2"
  local safe=$(safe_name "$screen_name")

  if is_visited "$safe"; then
    log "    (skipping $screen_name - already scanned)"
    return 0
  fi
  mark_visited "$safe"

  sleep 1  # let animations settle

  local hierarchy_file=$(capture_hierarchy "$safe")
  local screenshot_file=$(capture_screenshot "$safe")
  local elements_json='{"totalElements":0,"textElements":[],"testIds":[],"buttons":[],"inputFields":[]}'
  local status="failed"

  if [ -n "$hierarchy_file" ]; then
    elements_json=$(parse_elements "$hierarchy_file")
    local elem_count=$(echo "$elements_json" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("totalElements",0))' 2>/dev/null || echo '?')
    log "    Captured $screen_name: $elem_count elements"
    status="success"
    SUCCESSFUL=$((SUCCESSFUL + 1))
  else
    log "    FAILED to capture $screen_name"
    FAILED=$((FAILED + 1))
  fi
  TOTAL_SCREENS=$((TOTAL_SCREENS + 1))

  # Append to screens file using Python (safe JSON handling)
  python3 << PYEOF
import json

# Load existing screens
with open("$SCREENS_FILE", "r") as f:
    screens = json.load(f)

# Parse elements
elements = json.loads('''$(echo "$elements_json" | python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin)))" 2>/dev/null || echo '{}')''')

screens.append({
    "name": $(python3 -c "import json; print(json.dumps('$screen_name'))" 2>/dev/null),
    "navigatedVia": "$navigated_via",
    "hierarchyFile": "$hierarchy_file",
    "screenshotUrl": "/screenshots/$screenshot_file",
    "elements": elements,
    "status": "$status",
    "capturedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
})

with open("$SCREENS_FILE", "w") as f:
    json.dump(screens, f)
PYEOF
}

# ============================================================
# HIERARCHY ANALYSIS HELPERS (Python inline)
# ============================================================

# Find bottom tab bar items from a hierarchy file (JSON or XML).
# Returns JSON array of {text, y, x} for items in the bottom ~15% of screen.
find_bottom_tabs() {
  local hier_file="$1"
  python3 - "$hier_file" << 'PYEOF'
import json, sys, re

def parse_bounds(bounds_str):
    """Parse bounds '[x1,y1][x2,y2]' -> (x1,y1,x2,y2) or None"""
    try:
        parts = bounds_str.replace("][", ",").strip("[]").split(",")
        if len(parts) == 4:
            return tuple(int(p) for p in parts)
    except:
        pass
    return None

hier_file = sys.argv[1]
with open(hier_file) as f:
    content = f.read().strip()

# Detect format
is_json = content.startswith("{") or content.startswith("[")

max_y = [0]
tabs = []
seen_text = set()

def find_max_y_json(node):
    attrs = node.get("attributes", {})
    b = parse_bounds(attrs.get("bounds", ""))
    if b and b[3] > max_y[0]:
        max_y[0] = b[3]
    for child in node.get("children", []):
        find_max_y_json(child)

def find_tabs_json(node):
    attrs = node.get("attributes", {})
    text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
    enabled = attrs.get("enabled", "false") == "true"
    b = parse_bounds(attrs.get("bounds", ""))

    if b:
        cx, cy = (b[0]+b[2])/2, (b[1]+b[3])/2
        w, h = b[2]-b[0], b[3]-b[1]
        threshold = max_y[0] * 0.85
        if cy > threshold and w < 150 and h < 150 and w > 20 and h > 20:
            # Tab bar item found — use text if available, otherwise use position label
            label = text if (text and len(text) < 30) else f"icon_at_{int(cx)}_{int(cy)}"
            key = f"{int(cx)}_{int(cy)}"
            if key not in seen_text:
                seen_text.add(key)
                tabs.append({"text": label, "y": cy, "x": cx, "cx": int(cx), "cy": int(cy)})

    for child in node.get("children", []):
        find_tabs_json(child)

if is_json:
    data = json.loads(content)
    find_max_y_json(data)
    if max_y[0] == 0:
        max_y[0] = 932  # iPhone logical height
    find_tabs_json(data)
else:
    import xml.etree.ElementTree as ET
    try:
        root = ET.fromstring(content)
    except:
        print("[]")
        sys.exit(0)

    def find_max_xml(node):
        b = parse_bounds(node.get("bounds", ""))
        if b and b[3] > max_y[0]:
            max_y[0] = b[3]
        for child in node:
            find_max_xml(child)

    def find_tabs_xml(node):
        text = (node.get("text") or node.get("accessibilityText") or "").strip()
        clickable = node.get("clickable", "false").lower() == "true"
        b = parse_bounds(node.get("bounds", ""))
        if b:
            cx, cy = (b[0]+b[2])/2, (b[1]+b[3])/2
            threshold = max_y[0] * 0.85
            if text and (clickable or True) and cy > threshold and len(text) < 30:
                if text not in seen_text:
                    seen_text.add(text)
                    tabs.append({"text": text, "y": cy, "x": cx})
        for child in node:
            find_tabs_xml(child)

    find_max_xml(root)
    if max_y[0] == 0:
        max_y[0] = 2532
    find_tabs_xml(root)

tabs.sort(key=lambda t: t["x"])
print(json.dumps(tabs))
PYEOF
}

# Find login/continue buttons from a hierarchy file (JSON or XML).
find_login_buttons() {
  local hier_file="$1"
  python3 - "$hier_file" << 'PYEOF'
import json, sys, re

hier_file = sys.argv[1]
with open(hier_file) as f:
    content = f.read().strip()

is_json = content.startswith("{") or content.startswith("[")
buttons = []

login_patterns = [
    r"continue",
    r"get\s*started",
    r"sign\s*in",
    r"log\s*in",
    r"let.*go",
    r"start",
    r"enter",
    r"begin",
    r"skip",
]

def check_text(text):
    text_lower = text.lower()
    for pattern in login_patterns:
        if re.search(pattern, text_lower):
            buttons.append({"text": text, "pattern": pattern})
            return

if is_json:
    data = json.loads(content)
    def walk_json(node):
        attrs = node.get("attributes", {})
        text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
        enabled = attrs.get("enabled", "false") == "true"
        if text and enabled:
            check_text(text)
        for child in node.get("children", []):
            walk_json(child)
    walk_json(data)
else:
    import xml.etree.ElementTree as ET
    try:
        root = ET.fromstring(content)
    except:
        print("[]")
        sys.exit(0)
    def walk_xml(node):
        text = (node.get("text") or node.get("accessibilityText") or "").strip()
        clickable = node.get("clickable", "false").lower() == "true"
        if text and clickable:
            check_text(text)
        for child in node:
            walk_xml(child)
    walk_xml(root)

print(json.dumps(buttons))
PYEOF
}

# Find all tappable elements on a screen for deep exploration (JSON or XML).
# Returns JSON array of {text, testId, x, y, region} where region is top/middle/bottom.
find_tappable_elements() {
  local hier_file="$1"
  python3 - "$hier_file" << 'PYEOF'
import json, sys

def parse_bounds(bounds_str):
    try:
        parts = bounds_str.replace("][", ",").strip("[]").split(",")
        if len(parts) == 4:
            return tuple(int(p) for p in parts)
    except:
        pass
    return None

hier_file = sys.argv[1]
with open(hier_file) as f:
    content = f.read().strip()

is_json = content.startswith("{") or content.startswith("[")

max_y = [0]
items = []
seen = set()
skip_patterns = {"back", "close", "cancel", "ok", "done", "x", "search", "type", "enter"}

def add_item(text, test_id, bounds_str):
    b = parse_bounds(bounds_str)
    if not b:
        return
    cx, cy = (b[0]+b[2])/2, (b[1]+b[3])/2
    key = text or test_id
    if key and key not in seen and key.lower() not in skip_patterns and len(key) < 60:
        seen.add(key)
        my = max_y[0] if max_y[0] > 0 else 932
        region = "top" if cy < my * 0.15 else ("bottom" if cy > my * 0.85 else "middle")
        items.append({"text": text, "testId": test_id, "x": round(cx), "y": round(cy), "region": region})

if is_json:
    data = json.loads(content)
    def find_max_json(node):
        b = parse_bounds(node.get("attributes", {}).get("bounds", ""))
        if b and b[3] > max_y[0]:
            max_y[0] = b[3]
        for c in node.get("children", []):
            find_max_json(c)
    def walk_json(node):
        attrs = node.get("attributes", {})
        text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
        test_id = (attrs.get("resource-id") or attrs.get("testId") or "").strip()
        enabled = attrs.get("enabled", "false") == "true"
        if enabled and (text or test_id):
            add_item(text, test_id, attrs.get("bounds", ""))
        for c in node.get("children", []):
            walk_json(c)
    find_max_json(data)
    walk_json(data)
else:
    import xml.etree.ElementTree as ET
    try:
        root = ET.fromstring(content)
    except:
        print("[]")
        sys.exit(0)
    def find_max_xml(node):
        b = parse_bounds(node.get("bounds", ""))
        if b and b[3] > max_y[0]:
            max_y[0] = b[3]
        for c in node:
            find_max_xml(c)
    def walk_xml(node):
        text = (node.get("text") or node.get("accessibilityText") or "").strip()
        test_id = (node.get("resource-id") or node.get("testId") or "").strip()
        clickable = node.get("clickable", "false").lower() == "true"
        if clickable and (text or test_id):
            add_item(text, test_id, node.get("bounds", ""))
        for c in node:
            walk_xml(c)
    find_max_xml(root)
    walk_xml(root)

print(json.dumps(items))
PYEOF
}

# ============================================================
# MAIN SCAN FLOW
# ============================================================

TOTAL_PHASES=8

log "======================================================"
log "  HikeWise Deep Discovery Scanner"
log "  Scan ID:  $SCAN_ID"
log "  App ID:   $APP_ID ($EFFECTIVE_APP_ID)"
log "  App Mode: $APP_MODE"
log "  Device:   $DEVICE_TYPE ($DEVICE_NAME)"
log "  UDID:     ${DEVICE_UDID:-N/A (simulator)}"
log "  Expo URL: ${EXPO_DEV_URL:-not set}"
log "======================================================"

# ============================================================
# PHASE 1: Launch HikeWise through Expo Go
# ============================================================
log ""
log "=== PHASE 1/$TOTAL_PHASES: Launching HikeWise through Expo Go ==="
progress 1 "$TOTAL_PHASES" "Launching app" "starting"

# Helper: check if HikeWise is loaded (vs Expo Go's own UI)
check_hikewise_loaded() {
  local hier_file="$1"
  [ -f "$hier_file" ] && [ -s "$hier_file" ] || return 1
  python3 - "$hier_file" << 'CHECKEOF'
import json, sys
with open(sys.argv[1]) as f:
    data = json.loads(f.read().strip())

# Expo Go's own UI markers - check these FIRST since "HikeWise" can
# appear in Expo Go's "Recently opened" list
expo_markers = ["Recently opened", "Development servers", "Enter URL manually",
                "npx expo start", "Scan QR code", "Diagnostics",
                "Log In", "Log Out", "Share your feedback"]

# HikeWise-specific markers that ONLY appear inside the actual HikeWise app
# (not in Expo Go's recently opened list title)
hikewise_exclusive = ["Continue as Jacken", "Focus Starts Here",
                      "Focus Session Tracking", "Study Room Collaboration",
                      "Community Leaderboards", "Sign Out & Use Different Account",
                      "John F. Kennedy", "Weekly Focus Goal",
                      "Auto Do Not Disturb", "Nora AI",
                      "Theme & Environment", "Notification Preferences"]

def find_texts(node):
    texts = []
    attrs = node.get("attributes", {})
    text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
    if text:
        texts.append(text)
    for child in node.get("children", []):
        texts.extend(find_texts(child))
    return texts

all_texts = find_texts(data)
all_text_joined = " ".join(all_texts)

# Check for Expo Go FIRST (because "HikeWise" appears in Expo Go recents)
is_expo = False
for marker in expo_markers:
    if marker.lower() in all_text_joined.lower():
        is_expo = True
        break

# Check for HikeWise-exclusive content
is_hikewise = False
for marker in hikewise_exclusive:
    if marker.lower() in all_text_joined.lower():
        is_hikewise = True
        break

if is_hikewise and not is_expo:
    print("hikewise")
elif is_hikewise and is_expo:
    # Both found - could be transitioning. Check if Expo markers dominate
    expo_count = sum(1 for m in expo_markers if m.lower() in all_text_joined.lower())
    hw_count = sum(1 for m in hikewise_exclusive if m.lower() in all_text_joined.lower())
    if hw_count > expo_count:
        print("hikewise")
    else:
        print("expo-home")
elif is_expo:
    print("expo-home")
else:
    print("unknown")
CHECKEOF
}

# Step 1: Launch Expo Go (do NOT use clearState - it resets login/recents)
log "  Step 1: Opening Expo Go..."
LAUNCH_YAML=$(write_launch_yaml)
if run_mini_flow "$LAUNCH_YAML"; then
  log "  Expo Go launched"
else
  log "  Launch returned error, app may already be open..."
fi
sleep 3

# Step 2: Check if HikeWise is already loaded
log "  Step 2: Checking current screen..."
CHECK_HIER=$(capture_hierarchy "launch_check")
APP_STATE="unknown"
if [ -n "$CHECK_HIER" ]; then
  APP_STATE=$(check_hikewise_loaded "$CHECK_HIER")
  log "  Screen state: $APP_STATE"
fi

# Step 3: If not loaded, navigate Expo Go to open HikeWise
if [ "$APP_STATE" != "hikewise" ]; then
  log "  HikeWise not loaded. Navigating within Expo Go..."

  # First: Navigate to Expo Go's Home tab (use icon id, not text "Home" which is ambiguous)
  log "  Going to Expo Go's Home tab..."
  GOTO_HOME_YAML=$(write_mini_yaml "expo_home" "- tapOn:
    id: \"house.fill\"
    optional: true
- waitForAnimationToEnd")
  run_mini_flow "$GOTO_HOME_YAML" || true
  sleep 3

  # Re-check after navigating to home tab
  CHECK_HIER=$(capture_hierarchy "launch_check_1b")
  if [ -n "$CHECK_HIER" ]; then
    APP_STATE=$(check_hikewise_loaded "$CHECK_HIER")
    log "  After going to Home tab: $APP_STATE"
  fi
fi

if [ "$APP_STATE" != "hikewise" ]; then
  # Attempt A (primary): Tap HikeWise in recently opened list
  log "  Attempt A: Tapping 'HikeWise' in recently opened list..."
  TAP_HIKEWISE_YAML=$(write_mini_yaml "tap_hikewise" "- tapOn: \"HikeWise\"
- waitForAnimationToEnd
- extendedWaitUntil:
    visible: .*
    timeout: 25000")
  if run_mini_flow "$TAP_HIKEWISE_YAML"; then
    log "  Tap HikeWise succeeded, waiting for JS bundle..."
    sleep 12  # Give ample time for Expo to connect and load JS
  else
    log "  Tap HikeWise failed (not found in recents)"
    sleep 3
  fi

  CHECK_HIER=$(capture_hierarchy "launch_check_2")
  if [ -n "$CHECK_HIER" ]; then
    APP_STATE=$(check_hikewise_loaded "$CHECK_HIER")
    log "  After tap HikeWise: $APP_STATE"
  fi
fi

if [ "$APP_STATE" != "hikewise" ]; then
  # Attempt B: Use openLink to connect to the Expo dev server
  log "  Attempt B: Using openLink: ${EXPO_DEV_URL}..."
  LINK_YAML=$(write_mini_yaml "openlink_hw" "- openLink: ${EXPO_DEV_URL}
- waitForAnimationToEnd
- extendedWaitUntil:
    visible: .*
    timeout: 25000")
  run_mini_flow "$LINK_YAML" || true
  log "  Waiting for JS bundle to load..."
  sleep 12

  CHECK_HIER=$(capture_hierarchy "launch_check_3")
  if [ -n "$CHECK_HIER" ]; then
    APP_STATE=$(check_hikewise_loaded "$CHECK_HIER")
    log "  After openLink: $APP_STATE"
  fi
fi

if [ "$APP_STATE" != "hikewise" ]; then
  # Attempt C: Scroll in Expo Go and try tapping HikeWise again
  log "  Attempt C: Scrolling to find HikeWise..."
  SCROLL_TAP_YAML=$(write_mini_yaml "scroll_tap_hw" "- scroll
- tapOn:
    text: \"HikeWise\"
    optional: true
- waitForAnimationToEnd
- extendedWaitUntil:
    visible: .*
    timeout: 25000")
  run_mini_flow "$SCROLL_TAP_YAML" || true
  sleep 12

  CHECK_HIER=$(capture_hierarchy "launch_check_4")
  if [ -n "$CHECK_HIER" ]; then
    APP_STATE=$(check_hikewise_loaded "$CHECK_HIER")
    log "  After scroll+tap: $APP_STATE"
  fi
fi

if [ "$APP_STATE" = "hikewise" ]; then
  log "  SUCCESS: HikeWise is loaded and ready!"
else
  log "  FATAL: Could not load HikeWise after all attempts (state=$APP_STATE)."
  log "  Aborting scan. Please open HikeWise manually in Expo Go and retry."
  progress 1 "$TOTAL_PHASES" "Failed to load HikeWise" "error"
  exit 1
fi

# Clean up temporary check hierarchy files
rm -f "$DISCOVERY_DIR/${SCAN_ID}_hierarchy_launch_check"*.json 2>/dev/null
rm -f "$DISCOVERY_DIR/${SCAN_ID}_hierarchy_launch_check"*.raw 2>/dev/null

# ============================================================
# PHASE 2: Handle landing/login screen
# ============================================================
log ""
log "=== PHASE 2/$TOTAL_PHASES: Handling landing/login screen ==="
progress 2 "$TOTAL_PHASES" "Landing screen" "scanning"

# Capture what's on screen right now (could be landing page or home)
LANDING_HIERARCHY=$(capture_hierarchy "landing")
LANDING_SCREENSHOT=$(capture_screenshot "landing")

if [ -n "$LANDING_HIERARCHY" ]; then
  # Look for login/continue buttons
  LOGIN_BUTTONS=$(find_login_buttons "$LANDING_HIERARCHY")
  LOGIN_COUNT=$(echo "$LOGIN_BUTTONS" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)))' 2>/dev/null || echo "0")

  if [ "$LOGIN_COUNT" -gt 0 ]; then
    FIRST_LOGIN=$(echo "$LOGIN_BUTTONS" | python3 -c 'import json,sys; b=json.load(sys.stdin); print(b[0]["text"])' 2>/dev/null)
    log "  Found login button: \"$FIRST_LOGIN\""
    log "  Recording landing screen before tapping..."

    # Record the landing screen
    scan_screen "Landing Page" "launch"

    # Tap the login/continue button
    LOGIN_YAML=$(write_mini_yaml "login" "- tapOn: \"${FIRST_LOGIN}\"
- waitForAnimationToEnd")

    if run_mini_flow "$LOGIN_YAML"; then
      log "  Tapped \"$FIRST_LOGIN\" - waiting for home screen to load..."
      sleep 5  # Physical devices need more time for this transition

      # Wait for a home screen indicator (Focus button) to confirm navigation
      WAIT_HOME_YAML=$(write_mini_yaml "wait_home" "- extendedWaitUntil:
    visible: \"Focus\"
    timeout: 15000")
      run_mini_flow "$WAIT_HOME_YAML" || true
      sleep 1
    else
      log "  WARNING: Could not tap login button. Trying tap by text containing 'Continue'..."
      FALLBACK_YAML=$(write_mini_yaml "login_fallback" "- tapOn:
    text: \".*ontinue.*\"
    optional: true
- waitForAnimationToEnd")
      run_mini_flow "$FALLBACK_YAML" || true
      sleep 5
    fi
  else
    log "  No login buttons found - may already be on home screen"
    # Still record this as the initial screen
    scan_screen "Initial Screen" "launch"
  fi
else
  log "  WARNING: Could not capture landing screen hierarchy"
fi

# ============================================================
# PHASE 3: Capture home screen and discover bottom tabs
# ============================================================
log ""
log "=== PHASE 3/$TOTAL_PHASES: Home screen + bottom tab discovery ==="
progress 3 "$TOTAL_PHASES" "Home screen" "scanning"

# Verify we're on the home screen (not still on landing page)
# If "Continue as Jacken" is still visible, the login tap didn't work — retry
PRE_HOME_CHECK=$(capture_hierarchy "home_check")
if [ -n "$PRE_HOME_CHECK" ]; then
  STILL_LANDING=$(python3 - "$PRE_HOME_CHECK" << 'CHKEOF'
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
if "Continue as Jacken" in all_text:
    print("yes")
elif "Focus" in all_text and "Kennedy" in all_text:
    print("no")
else:
    print("unknown")
CHKEOF
  )
  if [ "$STILL_LANDING" = "yes" ]; then
    log "  Still on landing page! Retrying login tap..."
    RETRY_LOGIN_YAML=$(write_mini_yaml "retry_login" "- tapOn: \"Continue as Jacken\"
- waitForAnimationToEnd")
    run_mini_flow "$RETRY_LOGIN_YAML" || true
    sleep 5
    # Wait for home screen indicator
    RETRY_WAIT_YAML=$(write_mini_yaml "retry_wait_home" "- extendedWaitUntil:
    visible: \"Focus\"
    timeout: 15000")
    run_mini_flow "$RETRY_WAIT_YAML" || true
    sleep 2
  fi
  rm -f "$PRE_HOME_CHECK" 2>/dev/null
fi

HOME_HIERARCHY=$(capture_hierarchy "home")
HOME_SCREENSHOT=$(capture_screenshot "home")

BOTTOM_TABS_JSON="[]"
TAB_COUNT=0

if [ -n "$HOME_HIERARCHY" ]; then
  scan_screen "Home" "tab"

  # Discover bottom tabs
  BOTTOM_TABS_JSON=$(find_bottom_tabs "$HOME_HIERARCHY")
  TAB_COUNT=$(echo "$BOTTOM_TABS_JSON" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)))' 2>/dev/null || echo "0")
  log "  Discovered $TAB_COUNT bottom tabs: $(echo "$BOTTOM_TABS_JSON" | python3 -c 'import json,sys; tabs=json.load(sys.stdin); print(", ".join(t["text"] for t in tabs))' 2>/dev/null || echo 'none')"

  # Also capture tappable elements for deep scan later
  HOME_TAPPABLES=$(find_tappable_elements "$HOME_HIERARCHY")
  HOME_TAP_COUNT=$(echo "$HOME_TAPPABLES" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)))' 2>/dev/null || echo "0")
  log "  Found $HOME_TAP_COUNT tappable elements on home screen"
else
  log "  FAILED to capture home screen"
  scan_screen "Home" "tab"
fi

# ============================================================
# PHASE 4: Navigate each bottom tab
# ============================================================
log ""
log "=== PHASE 4/$TOTAL_PHASES: Scanning bottom tabs ==="
progress 4 "$TOTAL_PHASES" "Bottom tabs" "scanning"

for i in $(seq 0 $((TAB_COUNT - 1))); do
  TAB_TEXT=$(echo "$BOTTOM_TABS_JSON" | python3 -c "import json,sys; tabs=json.load(sys.stdin); print(tabs[$i]['text'])" 2>/dev/null)
  TAB_SAFE=$(safe_name "$TAB_TEXT")

  if [ -z "$TAB_TEXT" ] || is_visited "$TAB_SAFE"; then
    continue
  fi

  # Get tab coordinates for coordinate-based tapping
  TAB_CX=$(echo "$BOTTOM_TABS_JSON" | python3 -c "import json,sys; tabs=json.load(sys.stdin); print(tabs[$i].get('cx', 0))" 2>/dev/null || echo "0")
  TAB_CY=$(echo "$BOTTOM_TABS_JSON" | python3 -c "import json,sys; tabs=json.load(sys.stdin); print(tabs[$i].get('cy', 0))" 2>/dev/null || echo "0")

  log "  [$((i+1))/$TAB_COUNT] Tapping bottom tab: $TAB_TEXT (at $TAB_CX,$TAB_CY)"

  # Tap the tab - use coordinates if no text label, otherwise try text first
  if echo "$TAB_TEXT" | grep -q "^icon_at_"; then
    # No text label — tap by coordinate
    TAB_YAML=$(write_mini_yaml "tab_${TAB_SAFE}" "- tapOn:
    point: \"${TAB_CX},${TAB_CY}\"
- waitForAnimationToEnd")
  else
    # Has text label — tap by text
    TAB_YAML=$(write_mini_yaml "tab_${TAB_SAFE}" "- tapOn:
    text: \"${TAB_TEXT}\"
- waitForAnimationToEnd")
  fi

  if run_mini_flow "$TAB_YAML"; then
    sleep "$NAV_WAIT"
    scan_screen "$TAB_TEXT" "bottom-tab"

    # Capture hierarchy for this tab to find sub-elements
    TAB_HIERARCHY=$(capture_hierarchy "tab_${TAB_SAFE}_detail")

    if [ -n "$TAB_HIERARCHY" ]; then
      # Look for sub-tabs within this tab
      TAB_SUB_TABS=$(find_bottom_tabs "$TAB_HIERARCHY")
      TAB_TAPPABLES=$(find_tappable_elements "$TAB_HIERARCHY")
      SUB_TAP_COUNT=$(echo "$TAB_TAPPABLES" | python3 -c 'import json,sys; items=json.load(sys.stdin); print(len([i for i in items if i["region"]=="middle"]))' 2>/dev/null || echo "0")
      log "    Found $SUB_TAP_COUNT tappable items in middle region"

      # Scroll down to see more content
      log "    Scrolling down to discover more..."
      SCROLL_YAML=$(write_mini_yaml "scroll_${TAB_SAFE}" "- scroll:
    direction: DOWN
- waitForAnimationToEnd")
      if run_mini_flow "$SCROLL_YAML"; then
        sleep 1
        SCROLL_SAFE="${TAB_SAFE}_scrolled"
        if ! is_visited "$SCROLL_SAFE"; then
          scan_screen "${TAB_TEXT} (scrolled)" "scroll"
        fi
      fi

      # Tap interesting sub-elements in the middle region (max 5 per tab)
      SUB_ITEMS=$(echo "$TAB_TAPPABLES" | python3 -c "
import json, sys
items = json.load(sys.stdin)
# Only middle-region items, skip things that look like bottom tabs
middle = [i for i in items if i['region'] == 'middle' and len(i.get('text','')) > 2]
# Prioritize items with text over just testIds
middle.sort(key=lambda x: (0 if x.get('text') else 1, x.get('y', 0)))
for item in middle[:5]:
    print(item.get('text') or item.get('testId', ''))
" 2>/dev/null)

      SUB_IDX=0
      while IFS= read -r SUB_ITEM; do
        [ -z "$SUB_ITEM" ] && continue
        SUB_SAFE=$(safe_name "$SUB_ITEM")
        [ -z "$SUB_SAFE" ] && continue

        if is_visited "${TAB_SAFE}_${SUB_SAFE}"; then
          continue
        fi

        SUB_IDX=$((SUB_IDX + 1))
        log "    Sub-screen $SUB_IDX: tapping \"$SUB_ITEM\""

        SUB_YAML=$(write_mini_yaml "sub_${TAB_SAFE}_${SUB_SAFE}" "- tapOn:
    text: \"${SUB_ITEM}\"
    optional: true
- waitForAnimationToEnd")

        if run_mini_flow "$SUB_YAML"; then
          sleep "$NAV_WAIT"
          mark_visited "${TAB_SAFE}_${SUB_SAFE}"
          scan_screen "${TAB_TEXT} > ${SUB_ITEM}" "sub-screen"

          # Scroll down in sub-screen too
          SUBSCROLL_YAML=$(write_mini_yaml "subscroll_${TAB_SAFE}_${SUB_SAFE}" "- scroll:
    direction: DOWN
- waitForAnimationToEnd")
          run_mini_flow "$SUBSCROLL_YAML" || true
          sleep 1
          if ! is_visited "${TAB_SAFE}_${SUB_SAFE}_scrolled"; then
            scan_screen "${TAB_TEXT} > ${SUB_ITEM} (scrolled)" "scroll"
          fi

          # Go back (swipe from left edge — pressKey:back doesn't work on iOS)
          go_back "back_${TAB_SAFE}_${SUB_SAFE}"
        else
          log "      Could not tap \"$SUB_ITEM\""
        fi
      done <<< "$SUB_ITEMS"

      # Scroll back to top before moving to next tab
      SCROLL_UP_YAML=$(write_mini_yaml "scrollup_${TAB_SAFE}" "- scroll:
    direction: UP
- scroll:
    direction: UP
- waitForAnimationToEnd")
      run_mini_flow "$SCROLL_UP_YAML" || true
    fi
  else
    log "    FAILED to tap tab: $TAB_TEXT"
  fi
done

# ============================================================
# PHASE 5: Explore profile area (top-right icon)
# ============================================================
log ""
log "=== PHASE 5/$TOTAL_PHASES: Exploring profile / top-right area ==="
progress 5 "$TOTAL_PHASES" "Profile area" "scanning"

# First, go back to home — use the center bottom tab (HikeWise home is middle icon)
# or swipe back to get to main screen
go_back "return_home_for_profile"
sleep 1

# Try tapping the top-right area (profile icon)
# On HikeWise home screen, profile icon is at approximately (389,94) on 430x932 logical screen
# We find it dynamically from the hierarchy: small element in top-right with no text
log "  Finding profile icon in top-right..."
PROFILE_POS="389,94"  # default fallback
if [ -n "$HOME_HIERARCHY" ]; then
  FOUND_POS=$(python3 - "$HOME_HIERARCHY" << 'PROFEOF'
import json, sys, re
with open(sys.argv[1]) as f:
    data = json.loads(f.read().strip())
def find_all(node):
    results = []
    attrs = node.get("attributes", {})
    b = attrs.get("bounds", "")
    m = re.match(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", b)
    if m:
        x1,y1,x2,y2 = int(m.group(1)),int(m.group(2)),int(m.group(3)),int(m.group(4))
        text = (attrs.get("text") or attrs.get("accessibilityText") or "").strip()
        w,h = x2-x1, y2-y1
        results.append({"x1":x1,"y1":y1,"x2":x2,"y2":y2,"w":w,"h":h,"text":text})
    for child in node.get("children", []):
        results.extend(find_all(child))
    return results
elements = find_all(data)
# Profile icon: small element (30-70px), in top area (y < 150), right side (x > 300), no/short text
candidates = [e for e in elements
    if e["y1"] < 150 and e["y1"] > 40 and e["x1"] > 300
    and 25 <= e["w"] <= 80 and 25 <= e["h"] <= 80
    and len(e["text"]) < 5]
if candidates:
    c = candidates[0]
    cx, cy = (c["x1"]+c["x2"])//2, (c["y1"]+c["y2"])//2
    print(f"{cx},{cy}")
else:
    print("")
PROFEOF
  )
  if [ -n "$FOUND_POS" ]; then
    PROFILE_POS="$FOUND_POS"
    log "  Profile icon found at: $PROFILE_POS"
  else
    log "  Profile icon not found in hierarchy, using default: $PROFILE_POS"
  fi
fi

log "  Tapping profile icon at $PROFILE_POS..."
PROFILE_YAML=$(write_mini_yaml "profile_icon" "- tapOn:
    point: \"${PROFILE_POS}\"
- waitForAnimationToEnd")

if run_mini_flow "$PROFILE_YAML"; then
  sleep "$NAV_WAIT"

  # Check if something new appeared
  PROFILE_HIERARCHY=$(capture_hierarchy "profile_area")

  if [ -n "$PROFILE_HIERARCHY" ]; then
    scan_screen "Profile Area" "profile-icon"

    # Find tappable items in the profile/drawer area
    PROFILE_ITEMS=$(find_tappable_elements "$PROFILE_HIERARCHY")
    PROFILE_TEXTS=$(echo "$PROFILE_ITEMS" | python3 -c "
import json, sys
items = json.load(sys.stdin)
for item in items:
    t = item.get('text', '')
    if t and len(t) > 1 and len(t) < 40:
        print(t)
" 2>/dev/null)

    PROF_IDX=0
    while IFS= read -r PROF_ITEM; do
      [ -z "$PROF_ITEM" ] && continue
      PROF_SAFE=$(safe_name "$PROF_ITEM")
      [ -z "$PROF_SAFE" ] && continue

      if is_visited "profile_$PROF_SAFE"; then
        continue
      fi

      PROF_IDX=$((PROF_IDX + 1))
      [ "$PROF_IDX" -gt 8 ] && break  # limit to 8 items in profile area

      log "    Profile item $PROF_IDX: tapping \"$PROF_ITEM\""

      PROF_NAV_YAML=$(write_mini_yaml "profile_${PROF_SAFE}" "- tapOn:
    text: \"${PROF_ITEM}\"
    optional: true
- waitForAnimationToEnd")

      if run_mini_flow "$PROF_NAV_YAML"; then
        sleep "$NAV_WAIT"
        mark_visited "profile_$PROF_SAFE"
        scan_screen "Profile > ${PROF_ITEM}" "profile-menu"

        # Scroll down in this sub-screen
        PROF_SCROLL_YAML=$(write_mini_yaml "profscroll_${PROF_SAFE}" "- scroll:
    direction: DOWN
- waitForAnimationToEnd")
        run_mini_flow "$PROF_SCROLL_YAML" || true
        sleep 1
        scan_screen "Profile > ${PROF_ITEM} (scrolled)" "scroll"

        # Go back (swipe from left edge)
        go_back "profback_${PROF_SAFE}"
      fi
    done <<< "$PROFILE_TEXTS"

    # Close profile area (go back to home)
    go_back "close_profile"
  fi
else
  log "  Top-right tap didn't navigate anywhere, trying other positions..."
  # Try slightly different position
  for POS in "92%,6%" "88%,5%" "93%,7%" "85%,5%"; do
    ALT_YAML=$(write_mini_yaml "profile_alt_$(echo $POS | tr '%,' '_')" "- tapOn:
    point: \"${POS}\"
- waitForAnimationToEnd")
    if run_mini_flow "$ALT_YAML"; then
      sleep "$NAV_WAIT"
      ALT_HIERARCHY=$(capture_hierarchy "profile_alt")
      if [ -n "$ALT_HIERARCHY" ]; then
        log "  Found something at position $POS"
        scan_screen "Profile Area" "profile-icon-alt"
        # Close it (go back)
        go_back "close_profile_alt"
        break
      fi
    fi
  done
fi

# ============================================================
# PHASE 6: Navigate to Settings
# ============================================================
log ""
log "=== PHASE 6/$TOTAL_PHASES: Finding and scanning Settings ==="
progress 6 "$TOTAL_PHASES" "Settings" "scanning"

if ! is_visited "settings"; then
  # Strategy 1: Look for Settings in bottom tabs
  SETTINGS_FOUND=false

  # Try tapping text "Settings"
  SETTINGS_YAML=$(write_mini_yaml "nav_settings" "- tapOn:
    text: \"Settings\"
    optional: true
- waitForAnimationToEnd")

  if run_mini_flow "$SETTINGS_YAML"; then
    sleep "$NAV_WAIT"
    SETTINGS_HIERARCHY=$(capture_hierarchy "settings_check")
    if [ -n "$SETTINGS_HIERARCHY" ]; then
      scan_screen "Settings" "direct-tap"
      SETTINGS_FOUND=true

      # Scroll through settings to capture everything
      for SCROLL_NUM in 1 2 3; do
        SSETTINGS_SCROLL_YAML=$(write_mini_yaml "settings_scroll_${SCROLL_NUM}" "- scroll:
    direction: DOWN
- waitForAnimationToEnd")
        run_mini_flow "$SSETTINGS_SCROLL_YAML" || true
        sleep 1
        scan_screen "Settings (scroll $SCROLL_NUM)" "scroll"
      done

      # Go back (swipe from left edge)
      go_back "settings_back"
    fi
  fi

  if [ "$SETTINGS_FOUND" = "false" ]; then
    log "  Settings not found via direct tap, trying profile > settings..."
    # Open profile area again and look for settings
    PROF2_YAML=$(write_mini_yaml "prof_for_settings" "- tapOn:
    point: \"${PROFILE_POS}\"
- waitForAnimationToEnd")
    if run_mini_flow "$PROF2_YAML"; then
      sleep 1
      SETTINGS_YAML2=$(write_mini_yaml "settings_from_profile" "- tapOn:
    text: \"Settings\"
    optional: true
- tapOn:
    text: \".*etting.*\"
    optional: true
- waitForAnimationToEnd")
      if run_mini_flow "$SETTINGS_YAML2"; then
        sleep "$NAV_WAIT"
        scan_screen "Settings" "profile-menu"
        # Scroll
        for SCROLL_NUM in 1 2; do
          SSCROLL_YAML=$(write_mini_yaml "settings_scroll2_${SCROLL_NUM}" "- scroll:
    direction: DOWN
- waitForAnimationToEnd")
          run_mini_flow "$SSCROLL_YAML" || true
          sleep 1
          scan_screen "Settings (scroll $SCROLL_NUM)" "scroll"
        done
      fi
      # Go back twice (settings -> profile -> home)
      go_back "back_from_settings_1"
      go_back "back_from_settings_2"
    fi
  fi
fi

# ============================================================
# PHASE 7: Nora screen (paw icon at bottom)
# ============================================================
log ""
log "=== PHASE 7/$TOTAL_PHASES: Exploring Nora screen (paw icon) ==="
progress 7 "$TOTAL_PHASES" "Nora screen" "scanning"

if ! is_visited "nora"; then
  NORA_FOUND=false

  # Strategy 1: Try text-based tap
  for NORA_TEXT in "Nora" "nora" "AI" "Assistant" "Chat"; do
    NORA_YAML=$(write_mini_yaml "nora_${NORA_TEXT}" "- tapOn:
    text: \"${NORA_TEXT}\"
    optional: true
- waitForAnimationToEnd")
    if run_mini_flow "$NORA_YAML"; then
      sleep "$NAV_WAIT"
      NORA_HIERARCHY=$(capture_hierarchy "nora_check")
      if [ -n "$NORA_HIERARCHY" ]; then
        scan_screen "Nora" "bottom-tab"
        NORA_FOUND=true

        # Explore Nora screen
        NORA_TAPPABLES=$(find_tappable_elements "$NORA_HIERARCHY")
        NORA_ITEMS=$(echo "$NORA_TAPPABLES" | python3 -c "
import json, sys
items = json.load(sys.stdin)
for item in items:
    t = item.get('text', '')
    if t and len(t) > 2 and item.get('region') == 'middle':
        print(t)
" 2>/dev/null)

        NORA_IDX=0
        while IFS= read -r NORA_ITEM; do
          [ -z "$NORA_ITEM" ] && continue
          NORA_SAFE=$(safe_name "$NORA_ITEM")
          NORA_IDX=$((NORA_IDX + 1))
          [ "$NORA_IDX" -gt 5 ] && break

          log "    Nora sub-item $NORA_IDX: \"$NORA_ITEM\""
          NORA_SUB_YAML=$(write_mini_yaml "nora_sub_${NORA_SAFE}" "- tapOn:
    text: \"${NORA_ITEM}\"
    optional: true
- waitForAnimationToEnd")
          if run_mini_flow "$NORA_SUB_YAML"; then
            sleep "$NAV_WAIT"
            scan_screen "Nora > ${NORA_ITEM}" "sub-screen"
            go_back "nora_back_${NORA_SAFE}"
          fi
        done <<< "$NORA_ITEMS"

        break
      fi
    fi
  done

  # Strategy 2: If not found by text, try tapping paw icon area in bottom nav
  if [ "$NORA_FOUND" = "false" ]; then
    log "  Nora not found by text, trying bottom tab positions..."

    # The paw icon is typically one of the middle or last bottom tabs
    # Try center and right-center of bottom bar
    for POS in "50%,96%" "62%,96%" "75%,96%" "37%,96%"; do
      NORA_POS_YAML=$(write_mini_yaml "nora_pos_$(echo $POS | tr '%,' '_')" "- tapOn:
    point: \"${POS}\"
- waitForAnimationToEnd")
      if run_mini_flow "$NORA_POS_YAML"; then
        sleep "$NAV_WAIT"
        NORA_POS_HIERARCHY=$(capture_hierarchy "nora_pos")
        if [ -n "$NORA_POS_HIERARCHY" ]; then
          scan_screen "Bottom Tab ($POS)" "position-tap"
          log "    Found screen at bottom position $POS"
        fi
      fi
    done
  fi

  # Go back to first tab (home) using coordinates
  if [ "$TAB_COUNT" -gt 0 ]; then
    FIRST_TAB_CX=$(echo "$BOTTOM_TABS_JSON" | python3 -c 'import json,sys; tabs=json.load(sys.stdin); print(tabs[0].get("cx",0))' 2>/dev/null || echo "0")
    FIRST_TAB_CY=$(echo "$BOTTOM_TABS_JSON" | python3 -c 'import json,sys; tabs=json.load(sys.stdin); print(tabs[0].get("cy",0))' 2>/dev/null || echo "0")
    if [ "$FIRST_TAB_CX" != "0" ]; then
      GOHOME_YAML=$(write_mini_yaml "go_home_final" "- tapOn:
    point: \"${FIRST_TAB_CX},${FIRST_TAB_CY}\"
- waitForAnimationToEnd")
      run_mini_flow "$GOHOME_YAML" || true
    fi
  fi
fi

# ============================================================
# PHASE 8: Compile discovery report
# ============================================================
log ""
log "=== PHASE 8/$TOTAL_PHASES: Compiling discovery report ==="
progress 8 "$TOTAL_PHASES" "Compiling report" "compiling"

REPORT_FILE="$DISCOVERY_DIR/${SCAN_ID}_report.json"

python3 << PYEOF
import json

with open("$SCREENS_FILE", "r") as f:
    screens = json.load(f)

bottom_tabs = json.loads('''$(echo "$BOTTOM_TABS_JSON" | python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin)))" 2>/dev/null || echo '[]')''')

# Compute summary stats
total_test_ids = set()
total_text_labels = set()
total_elements = 0

for s in screens:
    elems = s.get("elements", {})
    for tid in elems.get("testIds", []):
        total_test_ids.add(tid)
    for t in elems.get("textElements", []):
        total_text_labels.add(t)
    total_elements += elems.get("totalElements", 0)

report = {
    "scanId": "$SCAN_ID",
    "appId": "$APP_ID",
    "appMode": "$APP_MODE",
    "expoDevUrl": "$EXPO_DEV_URL",
    "deviceType": "$DEVICE_TYPE",
    "deviceName": "$DEVICE_NAME",
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "discoveredBottomTabs": [t["text"] for t in bottom_tabs],
    "screens": screens,
    "summary": {
        "totalScreens": len(screens),
        "successfulCaptures": sum(1 for s in screens if s.get("status") == "success"),
        "failedCaptures": sum(1 for s in screens if s.get("status") == "failed"),
        "totalTestIds": len(total_test_ids),
        "totalTextLabels": len(total_text_labels),
        "totalElements": total_elements,
        "navigationPaths": list(set(s.get("navigatedVia", "") for s in screens))
    }
}

with open("$REPORT_FILE", "w") as f:
    json.dump(report, f, indent=2)

print(json.dumps(report, indent=2))
PYEOF

log ""
log "======================================================"
log "  Deep Scan Complete!"
log "  Screens scanned: $TOTAL_SCREENS ($SUCCESSFUL ok, $FAILED failed)"
log "  Report: $REPORT_FILE"
log "======================================================"

# Notify dashboard
progress "$TOTAL_PHASES" "$TOTAL_PHASES" "Complete" "complete"

exit 0
