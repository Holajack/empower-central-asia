# Quick Start Guide - BBB Web Intelligence System

This guide will get you up and running with the Morpheus orchestration system in **under 30 minutes**.

---

## Prerequisites

Before you begin, ensure you have:

- [x] Python 3.9+ installed
- [x] Git installed and configured
- [x] Node.js 18+ (for existing TypeScript components)
- [x] Access to the BBB website repository
- [x] Admin access to the website hosting (Netlify)

---

## Step 1: Initial Setup (5 minutes)

### 1.1 Clone/Navigate to Repository

```bash
cd "/Users/jackenholland/Businesses Beyond Borders/empower-central-asia"
```

### 1.2 Create Python Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # On macOS/Linux
# OR
venv\Scripts\activate  # On Windows

# Verify activation
which python  # Should show path to venv
```

### 1.3 Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 1.4 Create Directory Structure

```bash
# Create automation directories
mkdir -p automation/{agents,utils,config,workflows,reports/{daily,weekly,monthly}}
mkdir -p logs
mkdir -p .cache

# Create agent directories
mkdir -p automation/agents/{web_scout,web_scribe,web_revive,web_canvas,web_beacon,web_architect,web_navigator,web_pulse,web_custodian}
```

---

## Step 2: Configure Environment Variables (10 minutes)

### 2.1 Copy Environment Template

```bash
cp .env.production.template .env
```

### 2.2 Edit .env File

Open `.env` in your text editor and fill in the following **critical** credentials:

#### Required Immediately:
```bash
# OpenAI (for content generation)
OPENAI_API_KEY=sk-...your-actual-key

# Netlify (for deployment)
NETLIFY_API_KEY=your-netlify-key
NETLIFY_SITE_ID=your-site-id
NETLIFY_BUILD_HOOK_URL=your-build-hook-url

# Website paths
WEBSITE_PATH=/Users/jackenholland/Businesses Beyond Borders/empower-central-asia
```

#### Optional (Can Add Later):
```bash
# Google Cloud APIs (for SEO, Analytics, Translation)
GOOGLE_OAUTH_CREDENTIALS=/path/to/credentials.json
PAGESPEED_API_KEY=your-key

# Image generation
NANO_BANANA_API_KEY=your-key

# Communications (Twilio, SendGrid)
SENDGRID_API_KEY=your-key
```

### 2.3 Verify Configuration

```bash
# Test environment loading
python3 -c "from dotenv import load_dotenv; load_dotenv(); import os; print('✓ OpenAI Key:', 'FOUND' if os.getenv('OPENAI_API_KEY') else 'MISSING')"
```

---

## Step 3: Google Cloud Setup (10 minutes)

This is **required** for SEO monitoring, analytics, and translation features.

### 3.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Name: `BBB Web Intelligence`
4. Project ID: `bbb-web-intelligence` (or auto-generated)
5. Click "Create"

### 3.2 Enable Required APIs

Navigate to **APIs & Services → Library** and enable:

- ✅ Google Search Console API
- ✅ Google Analytics Data API (GA4)
- ✅ PageSpeed Insights API
- ✅ Cloud Translation API
- ✅ Custom Search API (optional)

### 3.3 Create OAuth Credentials

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth Client ID**
3. Configure consent screen:
   - User Type: External
   - App name: BBB Web Intelligence
   - User support email: your-email
   - Developer contact: your-email
4. Create OAuth client:
   - Application type: **Desktop app**
   - Name: BBB Web Intelligence OAuth
5. **Download JSON** file
6. Save as: `~/.config/google-mcp/gcp-oauth.keys.json`

```bash
# Create directory if it doesn't exist
mkdir -p ~/.config/google-mcp

# Move downloaded file
mv ~/Downloads/client_secret_*.json ~/.config/google-mcp/gcp-oauth.keys.json
```

### 3.4 Create API Key (for PageSpeed Insights)

1. **Create Credentials → API Key**
2. Name: BBB PageSpeed API Key
3. **Restrict key** (recommended):
   - API restrictions → Restrict key
   - Select: PageSpeed Insights API
4. Copy key and add to `.env`:

```bash
PAGESPEED_API_KEY=your-copied-key
```

---

## Step 4: Test API Connections (5 minutes)

Create a test script to verify all APIs are working:

### 4.1 Create Test Script

```bash
cat > automation/test_apis.py << 'EOF'
#!/usr/bin/env python3
"""
Test API Connections for BBB Web Intelligence System
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_openai():
    """Test OpenAI API connection"""
    try:
        import openai
        openai.api_key = os.getenv('OPENAI_API_KEY')

        # Test with a simple completion
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Say 'API test successful'"}],
            max_tokens=10
        )

        print("✅ OpenAI API: Connected")
        return True
    except Exception as e:
        print(f"❌ OpenAI API: Failed - {e}")
        return False

def test_netlify():
    """Test Netlify API connection"""
    try:
        import requests

        api_key = os.getenv('NETLIFY_API_KEY')
        site_id = os.getenv('NETLIFY_SITE_ID')

        if not api_key or not site_id:
            print("⚠️  Netlify API: Not configured (optional for now)")
            return True

        headers = {'Authorization': f'Bearer {api_key}'}
        response = requests.get(
            f'https://api.netlify.com/api/v1/sites/{site_id}',
            headers=headers,
            timeout=10
        )

        if response.status_code == 200:
            print("✅ Netlify API: Connected")
            return True
        else:
            print(f"❌ Netlify API: Failed - Status {response.status_code}")
            return False

    except Exception as e:
        print(f"❌ Netlify API: Failed - {e}")
        return False

def test_google_oauth():
    """Test Google OAuth credentials"""
    try:
        creds_path = os.getenv('GOOGLE_OAUTH_CREDENTIALS')

        if not creds_path:
            print("⚠️  Google OAuth: Not configured (optional for now)")
            return True

        if not os.path.exists(creds_path):
            print(f"❌ Google OAuth: Credentials file not found at {creds_path}")
            return False

        print("✅ Google OAuth: Credentials file found")
        return True

    except Exception as e:
        print(f"❌ Google OAuth: Failed - {e}")
        return False

def test_environment():
    """Test environment configuration"""
    required = ['OPENAI_API_KEY', 'WEBSITE_PATH']
    optional = ['NETLIFY_API_KEY', 'GOOGLE_OAUTH_CREDENTIALS']

    print("\n🔧 Environment Check:")
    print("-" * 50)

    all_good = True
    for var in required:
        if os.getenv(var):
            print(f"  ✅ {var}: Set")
        else:
            print(f"  ❌ {var}: Missing (REQUIRED)")
            all_good = False

    for var in optional:
        if os.getenv(var):
            print(f"  ✅ {var}: Set")
        else:
            print(f"  ⚠️  {var}: Not set (optional)")

    return all_good

def main():
    print("=" * 50)
    print("BBB Web Intelligence - API Connection Test")
    print("=" * 50)
    print()

    results = []

    # Test environment
    results.append(("Environment", test_environment()))
    print()

    # Test APIs
    print("🔌 Testing API Connections:")
    print("-" * 50)
    results.append(("OpenAI", test_openai()))
    results.append(("Netlify", test_netlify()))
    results.append(("Google OAuth", test_google_oauth()))

    print()
    print("=" * 50)
    print("Summary:")
    print("-" * 50)

    for name, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"  {name}: {status}")

    print("=" * 50)

    # Return exit code
    if all(success for _, success in results):
        print("\n🎉 All tests passed! Ready to run Morpheus.")
        return 0
    else:
        print("\n⚠️  Some tests failed. Please fix configuration and try again.")
        return 1

if __name__ == '__main__':
    sys.exit(main())
EOF

chmod +x automation/test_apis.py
```

### 4.2 Run Test Script

```bash
python automation/test_apis.py
```

**Expected Output:**
```
==================================================
BBB Web Intelligence - API Connection Test
==================================================

🔧 Environment Check:
--------------------------------------------------
  ✅ OPENAI_API_KEY: Set
  ✅ WEBSITE_PATH: Set
  ⚠️  NETLIFY_API_KEY: Not set (optional)
  ⚠️  GOOGLE_OAUTH_CREDENTIALS: Not set (optional)

🔌 Testing API Connections:
--------------------------------------------------
✅ OpenAI API: Connected
⚠️  Netlify API: Not configured (optional for now)
✅ Google OAuth: Credentials file found

==================================================
Summary:
--------------------------------------------------
  Environment: ✅ PASS
  OpenAI: ✅ PASS
  Netlify: ✅ PASS
  Google OAuth: ✅ PASS
==================================================

🎉 All tests passed! Ready to run Morpheus.
```

---

## Step 5: Run Your First Agent

Let's test the system by running a simple agent task.

### 5.1 Create a Simple Test Agent

```bash
cat > automation/test_agent.py << 'EOF'
#!/usr/bin/env python3
"""
Simple test to verify the system is working
"""

import os
import sys
from dotenv import load_dotenv
import openai

load_dotenv()

def test_content_generation():
    """Test basic content generation"""
    print("🤖 Testing Web-Scribe Agent (Content Generation)")
    print("-" * 50)

    openai.api_key = os.getenv('OPENAI_API_KEY')

    prompt = """
    Write a short blog post title and excerpt (2-3 sentences) about:
    "Microfinance opportunities for entrepreneurs in Central Asia"

    Keep it professional and inspiring.
    """

    print("📝 Generating content...")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200,
        temperature=0.7
    )

    content = response.choices[0].message.content

    print("\n✅ Content Generated:")
    print("-" * 50)
    print(content)
    print("-" * 50)
    print("\n🎉 Test successful! The Web-Scribe agent is ready.")

if __name__ == '__main__':
    try:
        test_content_generation()
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        sys.exit(1)
EOF

chmod +x automation/test_agent.py
```

### 5.2 Run Test Agent

```bash
python automation/test_agent.py
```

---

## Step 6: Next Steps

Congratulations! Your basic setup is complete. Here's what to do next:

### Immediate Next Steps:

1. **Review the full documentation:**
   - Read `API_INFRASTRUCTURE_PLAN.md` for complete details
   - Understand the agent architecture

2. **Add remaining API keys:**
   - Netlify API (for automated deployment)
   - Google Cloud APIs (for SEO monitoring)
   - Image generation API (Nano Banana or DALL-E)

3. **Implement your first full agent:**
   - Start with Web-Beacon (SEO monitoring) - it's the most useful
   - Or Web-Scribe (content generation) - builds on existing TypeScript code

### This Week:

- [ ] Complete Google Cloud setup
- [ ] Implement Web-Beacon agent
- [ ] Test weekly automation cycle
- [ ] Set up monitoring and alerts

### This Month:

- [ ] Implement all 9 agents
- [ ] Configure Morpheus orchestrator
- [ ] Set up automated workflows
- [ ] Deploy to production

---

## Troubleshooting

### Issue: Python virtual environment not activating

```bash
# Try this:
deactivate
python3 -m venv venv --clear
source venv/bin/activate
```

### Issue: OpenAI API key not working

```bash
# Verify key is set
echo $OPENAI_API_KEY

# Test manually
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Issue: Google OAuth not working

```bash
# Verify credentials file exists
ls -la ~/.config/google-mcp/gcp-oauth.keys.json

# Check file permissions
chmod 600 ~/.config/google-mcp/gcp-oauth.keys.json
```

### Issue: Import errors

```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

---

## Getting Help

If you encounter issues:

1. Check the logs in `/logs` directory
2. Review the full documentation in `API_INFRASTRUCTURE_PLAN.md`
3. Verify all environment variables in `.env`
4. Run the test script again: `python automation/test_apis.py`

---

## Security Reminders

- ✅ Never commit `.env` file to Git
- ✅ Rotate API keys every 90 days
- ✅ Use read-only tokens where possible
- ✅ Enable 2FA on all service accounts
- ✅ Monitor API usage for unusual activity

---

**You're all set!** The foundation is in place for the Morpheus web intelligence system. Time to build the agents and automate your website!
