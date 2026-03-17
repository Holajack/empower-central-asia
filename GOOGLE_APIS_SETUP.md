# Enable Required Google APIs for Web Agents

You already have Google Cloud Console set up! Now we just need to enable a few more APIs for the web agents.

## 📋 APIs to Enable (All FREE)

### **Step 1: Go to Google Cloud Console**
https://console.cloud.google.com/apis/library

### **Step 2: Enable These APIs (Click each link)**

#### **For web-beacon (SEO Agent):**
1. **Google Search Console API**
   - https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
   - Click "Enable"
   - ✅ FREE - No charges

2. **PageSpeed Insights API**
   - https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com
   - Click "Enable"
   - ✅ FREE - 25,000 requests/day

3. **Google Analytics Data API**
   - https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com
   - Click "Enable"
   - ✅ FREE - 100,000 requests/day

#### **For web-architect (Schema Agent):**
4. **Custom Search API** (optional, for testing)
   - https://console.cloud.google.com/apis/library/customsearch.googleapis.com
   - Click "Enable"
   - ✅ FREE - 100 queries/day

### **Step 3: Get an API Key (5 minutes)**

Some APIs need a simple API key (different from OAuth):

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **"Create Credentials"** → **"API Key"**
3. Copy the key (starts with `AIza...`)
4. **Restrict the key** (recommended):
   - Click the key you just created
   - Under "API restrictions":
     - Select "Restrict key"
     - Check only the APIs you enabled above
   - Click "Save"
5. Add to your `.env` file:
   ```bash
   GOOGLE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### **Step 4: Add Service Account to Search Console**

For Search Console API to work:

1. Go to: https://search.google.com/search-console
2. Select your property: `businessesbeyondborders.com`
3. Click **Settings** (left sidebar)
4. Click **Users and permissions**
5. Click **Add user**
6. Add email from your service account:
   - Open: `/Users/jackenholland/.config/google-mcp/gcp-oauth.keys.json`
   - Find the `client_email` field
   - Copy that email (looks like: `...@...iam.gserviceaccount.com`)
7. Paste the email and select **"Owner"** permission
8. Click **Add**

### **Step 5: Connect Google Analytics 4 (If you have it)**

If you use Google Analytics 4:

1. Go to: https://analytics.google.com/
2. Click **Admin** (gear icon)
3. Under "Property", click **Property Access Management**
4. Click **Add users**
5. Add the same service account email
6. Give "Viewer" role
7. Get your Property ID:
   - Admin → Property Settings
   - Copy "Property ID" (looks like: `123456789`)
8. Add to `.env`:
   ```bash
   GOOGLE_ANALYTICS_PROPERTY_ID=123456789
   ```

---

## ✅ **That's It!**

After enabling these APIs:

**Your `.env` should have:**
```bash
OPENAI_API_KEY=sk-proj-xxxxx (✅ You added this)
GOOGLE_API_KEY=AIzaSyxxxxx (⏳ Add this now)
GOOGLE_SEARCH_CONSOLE_CREDENTIALS=/Users/jackenholland/.config/google-mcp/gcp-oauth.keys.json (✅ Already set)
GOOGLE_ANALYTICS_PROPERTY_ID=123456789 (Optional - if you use GA4)
```

---

## 🧪 **Test Everything:**

```bash
cd "/Users/jackenholland/Businesses Beyond Borders/empower-central-asia"

# Install dependencies if not done
pip3 install -r requirements-agents.txt

# Test connections
python3 utils/api_client.py
```

Should see:
```
✅ OPENAI: Connected
✅ GOOGLE: Connected
✅ GIT: Connected
```

---

## 📊 **What Each Agent Will Use:**

| Agent | Google APIs Used |
|-------|------------------|
| **web-scout** | Google Trends (via pytrends library - no API needed) |
| **web-beacon** | Search Console, PageSpeed, Analytics |
| **web-architect** | Rich Results Test, Schema Validator |
| **web-custodian** | PageSpeed, Analytics |
| **web-pulse** | Already uses Google Calendar via MCP ✅ |

---

## 💡 **Quick Checklist:**

- [ ] Enable Search Console API
- [ ] Enable PageSpeed Insights API
- [ ] Enable Analytics Data API
- [ ] Create API Key in Google Cloud
- [ ] Add API key to `.env` file
- [ ] Add service account to Search Console
- [ ] (Optional) Add service account to GA4
- [ ] Test with `python3 utils/api_client.py`

---

**Once done, all agents will be fully functional!** 🚀
