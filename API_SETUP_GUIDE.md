# Morpheus Web Intelligence System - API Setup Guide

Complete guide for setting up all API integrations needed for the BBB website agents.

---

## 🚀 Quick Start

**Prerequisites:**
- Python 3.9+
- Node.js 18+ (for MCP servers)
- Git configured
- Access to Google Cloud Platform
- Netlify account

**Time to complete:** 2-3 hours

---

## 📋 Table of Contents

1. [OpenAI Setup](#1-openai-setup) ⭐ **REQUIRED**
2. [Google Cloud Platform Setup](#2-google-cloud-platform-setup) ⭐ **REQUIRED**
3. [Netlify Setup](#3-netlify-setup) ⭐ **REQUIRED**
4. [Optional Services](#4-optional-services)
5. [Installation & Testing](#5-installation--testing)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. OpenAI Setup

### ⭐ Required For:
- **web-scribe** (content generation)
- **web-revive** (content modernization)
- **morpheus** (orchestration)

### Steps:

1. **Create OpenAI Account**
   - Go to https://platform.openai.com/signup
   - Verify your email

2. **Add Payment Method**
   - Navigate to https://platform.openai.com/account/billing
   - Add a credit card (required for API access)
   - Set up billing alerts to avoid surprises

3. **Generate API Key**
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Name it: "BBB Website Agents"
   - **IMPORTANT:** Copy the key immediately (you won't see it again)
   - Save it as `OPENAI_API_KEY` in your `.env` file

4. **Set Usage Limits**
   - Recommended: $50-100/month budget
   - Enable usage notifications

### Cost Estimate:
- GPT-4.1 Turbo: ~$50-100/month
- DALL-E 3: ~$10-20/month
- **Total: $60-120/month**

---

## 2. Google Cloud Platform Setup

### ⭐ Required For:
- **web-scout** (Google Trends)
- **web-beacon** (Search Console, PageSpeed)
- **web-architect** (Rich Results, Schema Validation)
- **web-custodian** (Performance monitoring)

### Steps:

#### 2.1 Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click "New Project"
3. Name: "BBB Website Agents"
4. Note your Project ID

#### 2.2 Enable Required APIs

Enable these APIs at https://console.cloud.google.com/apis/library:

- ✅ **PageSpeed Insights API**
- ✅ **Search Console API**
- ✅ **Google Analytics Data API**
- ✅ **Custom Search JSON API** (optional)

Click "Enable" for each.

#### 2.3 Create Service Account

1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Name: "website-agents-sa"
4. Grant roles:
   - "Service Account User"
   - "Viewer"
5. Click "Create Key" → JSON
6. Download and save as `gcp-service-account.json`
7. Set path in `.env`: `GOOGLE_SEARCH_CONSOLE_CREDENTIALS`

#### 2.4 Create API Key

1. Go to https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "API Key"
3. Restrict key:
   - **API restrictions:** Select only the APIs you enabled
   - **Application restrictions:** HTTP referrers (if web-based)
4. Save as `GOOGLE_API_KEY` in `.env`

#### 2.5 Set up Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://businessesbeyondborders.com`
3. Verify ownership (DNS or HTML file)
4. Add service account email as owner:
   - Settings → Users and permissions
   - Add user with "Owner" permission
   - Email: `website-agents-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com`

#### 2.6 Set up Google Analytics 4

1. Go to https://analytics.google.com/
2. Create GA4 property (if not exists)
3. Get Property ID (looks like "123456789")
4. Add service account with "Viewer" role:
   - Admin → Property Access Management
   - Add users → Enter service account email

### Cost Estimate:
- **FREE** under typical usage (stays in free tier)
- PageSpeed API: 25,000 requests/day free
- Search Console API: 1,200 requests/minute free
- Analytics API: 100,000 requests/day free

---

## 3. Netlify Setup

### ⭐ Required For:
- **web-custodian** (deployment monitoring)
- **morpheus** (automated deployments)

### Steps:

1. **Create Netlify Account**
   - Go to https://app.netlify.com/signup
   - Connect your GitHub account

2. **Connect Repository**
   - New site from Git
   - Select: `empower-central-asia` repo
   - Branch: `main`
   - Build command: (leave blank for static)
   - Publish directory: `public` or root

3. **Get Site ID**
   - Site settings → General → Site details
   - Copy "Site ID"
   - Save as `NETLIFY_SITE_ID` in `.env`

4. **Generate Access Token**
   - User settings → Applications
   - Personal access tokens → "New access token"
   - Name: "Website Agents"
   - Save as `NETLIFY_AUTH_TOKEN` in `.env`

### Cost Estimate:
- **Starter Plan (Free):** 300 build minutes/month
- **Pro Plan ($19/month):** Recommended for production
  - Unlimited build minutes
  - Priority support
  - Advanced analytics

---

## 4. Optional Services

### 4.1 DeepL Translation API (for web-navigator)

1. Sign up at https://www.deepl.com/pro-api
2. Free tier: 500,000 characters/month
3. Get API key
4. Save as `DEEPL_API_KEY` in `.env`

**Cost:** $5.49/month after free tier

### 4.2 Twilio (for web-pulse SMS reminders)

1. Sign up at https://www.twilio.com/try-twilio
2. Get Account SID and Auth Token
3. Purchase a phone number
4. Save credentials in `.env`

**Cost:** ~$1/month + $0.0075/SMS

---

## 5. Installation & Testing

### 5.1 Install Python Dependencies

```bash
cd "/Users/jackenholland/Businesses Beyond Borders/empower-central-asia"

# Install dependencies
pip install -r requirements-agents.txt

# Or using pip3
pip3 install -r requirements-agents.txt
```

### 5.2 Configure Environment

```bash
# Copy template
cp .env.agents.template .env

# Edit with your API keys
nano .env
# or
code .env
```

### 5.3 Test API Connections

```bash
python utils/api_client.py
```

Expected output:
```
🔧 Testing API Connections...

📊 API Health Status:
  ✅ OPENAI: Connected
  ✅ GOOGLE: Connected
  ✅ NETLIFY: Connected
  ✅ GIT: Connected

✨ API Client Ready!
```

### 5.4 Test Individual Agents

```bash
# Test web-scout
python -c "from utils.api_client import APIManager; api = APIManager(); print(api.google.get_trends_data(['entrepreneurship']))"

# Test web-scribe
python -c "from utils.api_client import APIManager; api = APIManager(); print(api.openai.generate_text('Write a blog title about microfinance', max_tokens=50))"

# Test web-beacon
python -c "from utils.api_client import APIManager; api = APIManager(); print(api.google.get_pagespeed_insights('https://businessesbeyondborders.com'))"
```

---

## 6. Troubleshooting

### Common Issues:

#### ❌ "OPENAI_API_KEY not set"
**Solution:** Make sure `.env` file exists and contains your OpenAI API key

#### ❌ "Google API authentication failed"
**Solutions:**
1. Verify service account JSON file path is correct
2. Ensure APIs are enabled in Google Cloud Console
3. Check service account has proper permissions

#### ❌ "Netlify API returned 401"
**Solutions:**
1. Regenerate personal access token
2. Ensure token has full access scope
3. Check token hasn't expired

#### ❌ "Rate limit exceeded"
**Solutions:**
1. Adjust `RATE_LIMIT_REQUESTS` in `.env`
2. Use caching to reduce API calls
3. Upgrade API plan if needed

---

## 🎯 Next Steps

Once all APIs are configured and tested:

1. **Run morpheus orchestrator:**
   ```bash
   claude
   # Then: @morpheus-web-orchestrator run_all
   ```

2. **Schedule automated runs:**
   - Set up cron job for weekly automation
   - Sunday 2 AM EST recommended

3. **Monitor performance:**
   - Check logs in `logs/` directory
   - Review weekly reports from web-custodian

---

## 📊 Cost Summary

**Essential Services (Required):**
- OpenAI: $60-120/month
- Google Cloud: $0 (free tier)
- Netlify Pro: $19/month
- **TOTAL: $79-139/month**

**Optional Services:**
- DeepL: $5.49/month
- Twilio: $1/month + usage
- **TOTAL: ~$85-145/month**

---

## 🔒 Security Best Practices

1. **Never commit `.env` file to git**
   - Already in `.gitignore`
   - Double check before pushing

2. **Rotate API keys every 90 days**
   - Set calendar reminders
   - Update `.env` file

3. **Use service accounts with minimal permissions**
   - Follow principle of least privilege
   - Audit permissions quarterly

4. **Enable API usage alerts**
   - Set up billing alerts
   - Monitor for unusual activity

5. **Keep dependencies updated**
   ```bash
   pip install --upgrade -r requirements-agents.txt
   ```

---

## 📞 Support

**Questions or issues?**
- Check the [Troubleshooting](#6-troubleshooting) section
- Review agent-specific documentation
- Contact: Jacken Holland (jacken.holland@gmail.com)

---

**Last Updated:** November 7, 2024
**Version:** 1.0.0
