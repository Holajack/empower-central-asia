# How to Update Your Netlify Site After Drag & Drop

Since you deployed via drag & drop, here are **3 ways** to update your site with the new changes:

## ✅ **Method 1: Drag & Drop Update (Easiest)**

1. Go to your **Netlify dashboard** → **Sites** → Click your site
2. Go to **Deploys** tab
3. Drag your **entire updated E3Funnel folder** to the deploy area
4. New version deploys automatically (keeps same URL)

## ✅ **Method 2: Netlify CLI (Recommended for Future)**

```bash
# Install Netlify CLI (one time)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link this folder to your site
netlify link

# Deploy updates
netlify deploy --prod --dir=.
```

## ✅ **Method 3: Convert to Git Deployment**

```bash
# In your E3Funnel folder
git init
git add .
git commit -m "Add thumbnail and long funnel URL"

# Create GitHub repo, then:
git remote add origin https://github.com/yourusername/central-asia-funnel.git
git push -u origin main

# In Netlify dashboard:
# Site Settings → Build & Deploy → Link Repository
```

---

## 🆕 **What's New in This Update:**

### **Long Funnel URL Added:**
```
yoursite.netlify.app/ca-ministry-partnership-outreach-support-monthly-commitment-150-unreached-peoples-10-40-window-gospel-transformation/
```

### **Optimized Social Media Thumbnail:**
- ✅ New `central-asia-thumbnail.png` (5.4MB, 1200x630)
- ✅ Perfect Facebook/Twitter sharing optimization
- ✅ Enhanced Open Graph meta tags
- ✅ Added to sitemap for SEO

### **SEO Improvements:**
- ✅ Twitter image alt text for accessibility
- ✅ Open Graph image type specification
- ✅ Updated sitemap with new thumbnail
- ✅ Enhanced structured data

---

## 🎯 **After Update - Test These:**

1. **Long URL works:** `yoursite.netlify.app/ca-ministry-partnership-outreach-support-monthly-commitment-150-unreached-peoples-10-40-window-gospel-transformation/`

2. **Social sharing preview:**
   - Share site on Facebook - should show new thumbnail
   - Share on Twitter - should show new thumbnail
   - LinkedIn preview should work

3. **All existing features:**
   - Donation buttons work
   - Short URLs still work (`/donate`, `/give100`, etc.)
   - Mobile responsiveness
   - Exit-intent modal

## 📱 **Facebook Ad Integration:**

Use your **new long URL** in Facebook ads:
```
https://yoursite.netlify.app/ca-ministry-partnership-outreach-support-monthly-commitment-150-unreached-peoples-10-40-window-gospel-transformation/?ref=fb-ads-2025&utm_source=meta&utm_medium=cpc&utm_campaign=winter-outreach&utm_content=hero-cta&utm_term=monthly-partner
```

This prevents users from easily returning to your funnel without seeing ads again!

Your site is ready for professional ad campaigns! 🚀