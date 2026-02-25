/**
 * Dynamic Sitemap Generator for Businesses Beyond Borders
 * Generates sitemap.xml with all routes including blog posts
 * Run with: npx ts-node scripts/generate-sitemap.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://businessesbeyondborders.com';

interface SitemapEntry {
  loc: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
}

// Static routes with their priorities
const staticRoutes: SitemapEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/about', changefreq: 'monthly', priority: 0.9 },
  { loc: '/programs-and-impact', changefreq: 'monthly', priority: 0.9 },
  { loc: '/success-stories', changefreq: 'monthly', priority: 0.8 },
  { loc: '/get-involved', changefreq: 'monthly', priority: 0.8 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.8 },

  // Program pages
  { loc: '/programs/financial-literacy', changefreq: 'monthly', priority: 0.7 },
  { loc: '/programs/business-creation', changefreq: 'monthly', priority: 0.7 },
  { loc: '/programs/leadership-development', changefreq: 'monthly', priority: 0.7 },
  { loc: '/programs/community-collaboration', changefreq: 'monthly', priority: 0.7 },

  // Success stories
  { loc: '/success-stories/case-study-sarah', changefreq: 'yearly', priority: 0.6 },
  { loc: '/success-stories/case-study-marcus', changefreq: 'yearly', priority: 0.6 },

  // Application pages
  { loc: '/volunteer-application', changefreq: 'monthly', priority: 0.6 },
  { loc: '/partner-application', changefreq: 'monthly', priority: 0.6 },

  // Volunteer opportunities
  { loc: '/volunteer-opportunities/leadership-mentor', changefreq: 'monthly', priority: 0.6 },
  { loc: '/volunteer-opportunities/community-organizer', changefreq: 'monthly', priority: 0.6 },
  { loc: '/volunteer-opportunities/business-training', changefreq: 'monthly', priority: 0.6 },
  { loc: '/volunteer-opportunities/administrative-support', changefreq: 'monthly', priority: 0.6 },
  { loc: '/volunteer-opportunities/advocacy-outreach', changefreq: 'monthly', priority: 0.6 },

  // Legal pages
  { loc: '/sms', changefreq: 'yearly', priority: 0.3 },
  { loc: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { loc: '/mobile-terms', changefreq: 'yearly', priority: 0.3 },
];

// Function to get blog posts from the data file
function getBlogPosts(): SitemapEntry[] {
  try {
    // Read the blogPosts data file
    const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
    const content = fs.readFileSync(blogPostsPath, 'utf-8');

    // Extract blog post IDs and dates using regex
    const idMatches = content.matchAll(/id:\s*(\d+)/g);
    const dateMatches = content.matchAll(/date:\s*"([^"]+)"/g);

    const ids = Array.from(idMatches).map(m => m[1]);
    const dates = Array.from(dateMatches).map(m => m[1]);

    const blogPosts: SitemapEntry[] = [];

    for (let i = 0; i < ids.length; i++) {
      const date = dates[i] || '';
      const isoDate = parseDate(date);

      blogPosts.push({
        loc: `/blog/${ids[i]}`,
        changefreq: 'yearly',
        priority: 0.5,
        lastmod: isoDate
      });
    }

    return blogPosts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Parse date string to ISO format
function parseDate(dateStr: string): string {
  const months: { [key: string]: string } = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const month = months[parts[0]] || '01';
    const day = parts[1].replace(',', '').padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }

  return new Date().toISOString().split('T')[0];
}

// Generate XML sitemap
function generateSitemap(entries: SitemapEntry[]): string {
  const today = new Date().toISOString().split('T')[0];

  const urls = entries.map(entry => {
    const lastmod = entry.lastmod || today;
    return `  <url>
    <loc>${SITE_URL}${entry.loc}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

<!-- Generated: ${new Date().toISOString()} -->
<!-- Total URLs: ${entries.length} -->

<!-- Main Pages -->
${urls}

</urlset>`;
}

// Main execution
function main() {
  console.log('Generating sitemap.xml...');

  // Combine static routes with blog posts
  const blogPosts = getBlogPosts();
  const allEntries = [...staticRoutes, ...blogPosts];

  // Sort by priority (highest first)
  allEntries.sort((a, b) => b.priority - a.priority);

  // Generate sitemap XML
  const sitemapXml = generateSitemap(allEntries);

  // Write to public folder
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml, 'utf-8');

  console.log(`Sitemap generated successfully!`);
  console.log(`Total URLs: ${allEntries.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
