# Deployment Guide - Businesses Beyond Borders

This guide will help you deploy the Businesses Beyond Borders website to Netlify.

## Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Repository pushed to GitHub

## Quick Deploy to Netlify

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Log in to Netlify**
   - Go to [netlify.com](https://www.netlify.com/)
   - Click "Sign up" or "Log in"
   - Connect with your GitHub account

3. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your repositories
   - Select the `empower-central-asia` repository

4. **Configure Build Settings**

   Netlify should auto-detect these settings from `netlify.toml`, but verify:

   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Production branch**: `main`

5. **Deploy**
   - Click "Deploy site"
   - Netlify will assign a random subdomain (e.g., `random-name-12345.netlify.app`)
   - Wait 2-3 minutes for the build to complete

6. **Configure Custom Domain** (Optional)
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter `businessesbeyondborders.com`
   - Follow DNS configuration instructions
   - Enable HTTPS (automatic with Netlify)

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Log in to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

## Environment Variables

If you need to add environment variables:

1. Go to Site settings → Environment variables
2. Add variables as needed
3. Redeploy the site

Current project doesn't require environment variables for basic functionality.

## Post-Deployment Checklist

### ✅ Verify Site Functionality

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Programs pages load
- [ ] Blog loads and individual posts work
- [ ] Success stories load
- [ ] Contact forms work
- [ ] DonorBox donation widget appears
- [ ] GoHighLevel chat widget appears
- [ ] Mobile responsive design works
- [ ] Images load correctly

### ✅ SEO Configuration

- [ ] Verify robots.txt is accessible: `https://yourdomain.com/robots.txt`
- [ ] Verify sitemap is accessible: `https://yourdomain.com/sitemap.xml`
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify meta tags with social media card validators:
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### ✅ Performance Testing

- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test on mobile devices
- [ ] Check page load times (should be < 3 seconds)

### ✅ Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership (use DNS verification method)
4. Submit sitemap: `https://businessesbeyondborders.com/sitemap.xml`

## Continuous Deployment

Netlify automatically rebuilds and deploys when you push to your main branch:

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin main

# Netlify automatically deploys the changes
```

## Build Settings in netlify.toml

The project includes a `netlify.toml` file with the following configurations:

- **SPA Routing**: All routes redirect to `index.html` (React Router handles routing)
- **HTTPS Redirect**: Forces HTTPS for all traffic
- **Security Headers**: Adds security headers to all pages
- **Cache Headers**: Optimizes caching for static assets

## Troubleshooting

### Build Fails

1. Check build logs in Netlify dashboard
2. Ensure `package.json` dependencies are correct
3. Try building locally: `npm run build`
4. Check Node version (should be 18+)

### Routes Don't Work (404 errors)

- Verify `netlify.toml` includes the redirect rule
- Check that `dist` directory is being published
- Ensure React Router is configured correctly in `App.tsx`

### Images Don't Load

- Verify images are in `public/images/` directory
- Check image paths in code (should start with `/images/`)
- Clear Netlify cache and redeploy

### Forms Don't Submit

- Check GoHighLevel integration scripts in `index.html`
- Verify location ID is correct
- Test forms in incognito mode

### Chat Widget Not Appearing

- Verify GoHighLevel script is in `index.html`
- Check location ID: `yrV1cEsZkqJR4uo6pPvq`
- Test in different browsers

## Rollback to Previous Version

If something goes wrong:

1. Go to Deploys in Netlify dashboard
2. Find a previous successful deploy
3. Click "Publish deploy" to roll back

## Support

For deployment issues:
- Check [Netlify Documentation](https://docs.netlify.com/)
- Visit [Netlify Support](https://www.netlify.com/support/)
- Review build logs in Netlify dashboard

For code issues:
- Check repository GitHub Issues
- Review `README.md` for local development

## Performance Optimization Tips

1. **Image Optimization**: Use WebP format where possible
2. **Code Splitting**: Consider lazy loading routes
3. **CDN**: Netlify automatically uses CDN (no config needed)
4. **Caching**: Static assets are cached for 1 year (configured in `netlify.toml`)

## Monitoring

Consider adding these tools (optional):

- **Google Analytics 4** - Track user behavior
- **Sentry** - Error monitoring
- **Hotjar** - User session recording
- **Netlify Analytics** - Built-in analytics (paid)

---

**Last Updated**: 2025-10-20
**Deployment Platform**: Netlify
**Build Tool**: Vite 5.4
**Framework**: React 18 with TypeScript
