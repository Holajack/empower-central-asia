/**
 * Prerender script for BBB website
 * Generates static HTML for all routes so Google can index them.
 *
 * Usage: node scripts/prerender.mjs
 * Requires: npm run build first (operates on dist/ folder)
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

// MIME types for static file serving
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

// All routes to prerender
const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/get-involved',
  '/programs-and-impact',
  '/success-stories',
  '/blog',
  '/programs/financial-literacy',
  '/programs/business-creation',
  '/programs/leadership-development',
  '/programs/community-collaboration',
  '/success-stories/case-study-sarah',
  '/success-stories/case-study-marcus',
  '/volunteer-application',
  '/partner-application',
  '/volunteer-opportunities/leadership-mentor',
  '/volunteer-opportunities/community-organizer',
  '/volunteer-opportunities/business-training',
  '/volunteer-opportunities/administrative-support',
  '/volunteer-opportunities/advocacy-outreach',
  '/newsletter',
  '/tools/debt-calculator',
  '/cohort',
  '/resources',
  '/course/financial-literacy',
  '/course/business-creation',
  '/course/leadership-development',
  '/sms',
  '/privacy',
  '/mobile-terms',
];

// Extract blog post IDs from source, skipping future-dated posts
function getBlogPostIds() {
  const blogPostsPath = join(__dirname, '..', 'src', 'data', 'blogPosts.ts');
  const today = new Date().toISOString().split('T')[0];
  try {
    const content = readFileSync(blogPostsPath, 'utf-8');
    // Parse each blog post block to get id, slug, and publishDate
    const postBlocks = content.split(/(?=\s{2}\{[\s\n]+id:)/);
    const posts = [];
    for (const block of postBlocks) {
      const idMatch = block.match(/^\s*id:\s*(\d+)/m);
      const slugMatch = block.match(/slug:\s*"([^"]+)"/);
      const dateMatch = block.match(/publishDate:\s*"([^"]+)"/);
      if (idMatch && slugMatch) {
        const publishDate = dateMatch?.[1];
        // Skip posts with future publish dates
        if (publishDate && publishDate > today) {
          console.log(`  Skipping future post: ${slugMatch[1]} (publishes ${publishDate})`);
          continue;
        }
        posts.push({ id: idMatch[1], slug: slugMatch[1] });
      }
    }
    return posts;
  } catch {
    return [];
  }
}

// Simple static file server
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // If path doesn't have extension, try serving index.html (SPA fallback)
      if (!extname(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }

      // Check if file exists, if not try with .html
      if (!existsSync(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => {
      console.log(`Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `http://localhost:${PORT}${route}`;

  try {
    // Set prerender flag before page loads so popups/modals don't render
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDERING = true;
    });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

    // Wait for React to render
    await page.waitForSelector('#root > *', { timeout: 10000 });

    // Wait for react-helmet to update the <head> tags
    await page.waitForFunction(
      () => document.querySelector('[data-react-helmet]') !== null,
      { timeout: 5000 }
    ).catch(() => {
      // Some pages might not use Helmet, that's OK
    });

    // For non-homepage routes, wait until the canonical URL matches the route
    // This ensures React Router has navigated and helmet has updated
    if (route !== '/') {
      const canonicalMatched = await page.waitForFunction(
        (expectedPath) => {
          const canonical = document.querySelector('link[rel="canonical"][data-react-helmet]');
          if (!canonical) return false;
          return canonical.href.includes(expectedPath);
        },
        { timeout: 15000 },
        route
      ).then(() => true).catch(() => false);

      if (!canonicalMatched) {
        // Retry: wait extra time and check once more for slow-rendering pages
        await new Promise(r => setTimeout(r, 5000));
        const retryMatch = await page.evaluate((expectedPath) => {
          const canonical = document.querySelector('link[rel="canonical"][data-react-helmet]');
          return canonical ? canonical.href.includes(expectedPath) : false;
        }, route);
        if (!retryMatch) {
          console.warn(`  Warning: canonical mismatch for ${route}`);
        }
      }
    }

    // Extra settle time for all async updates
    await new Promise(r => setTimeout(r, 1500));

    // Get the full rendered HTML
    const html = await page.content();

    // Determine output path
    const outputDir = route === '/'
      ? DIST_DIR
      : join(DIST_DIR, ...route.split('/').filter(Boolean));

    mkdirSync(outputDir, { recursive: true });

    const outputPath = join(outputDir, 'index.html');
    writeFileSync(outputPath, html, 'utf-8');

    return true;
  } catch (error) {
    console.error(`  Failed: ${route} - ${error.message}`);
    return false;
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Starting prerender...\n');

  if (!existsSync(DIST_DIR)) {
    console.error('dist/ directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Collect all routes
  const blogPosts = getBlogPostIds();
  const blogRoutes = blogPosts.map(p => `/blog/${p.slug || p.id}`);
  const allRoutes = [...STATIC_ROUTES, ...blogRoutes];

  console.log(`Routes to prerender: ${allRoutes.length}`);
  console.log(`  Static: ${STATIC_ROUTES.length}`);
  console.log(`  Blog posts: ${blogRoutes.length}\n`);

  // Start server
  const server = await startServer();

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let failed = 0;

  // Process in batches of 3 to avoid resource contention on long blog posts
  const BATCH_SIZE = 3;
  for (let i = 0; i < allRoutes.length; i += BATCH_SIZE) {
    const batch = allRoutes.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(route => prerenderRoute(browser, route))
    );

    for (let j = 0; j < batch.length; j++) {
      if (results[j]) {
        success++;
        process.stdout.write(`  [${success + failed}/${allRoutes.length}] ${batch[j]}\n`);
      } else {
        failed++;
      }
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerender complete!`);
  console.log(`  Success: ${success}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Output: ${DIST_DIR}`);
}

main().catch(console.error);
