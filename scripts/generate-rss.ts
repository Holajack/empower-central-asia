/**
 * RSS Feed Generator for Businesses Beyond Borders Blog
 * Generates rss.xml with all blog posts
 * Run with: npx ts-node --esm scripts/generate-rss.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://businessesbeyondborders.com';
const SITE_TITLE = 'Businesses Beyond Borders Blog';
const SITE_DESCRIPTION = 'Empowering entrepreneurs in Central Asia through financial literacy, business training, and microfinance. Stories of impact from Port Orange, Florida to Kyrgyzstan, Kazakhstan, and Uzbekistan.';

interface BlogPostData {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  tags: string[];
  publishDate?: string;
}

// Parse date string to RFC822 format for RSS
function parseToRFC822(dateStr: string): string {
  const months: { [key: string]: number } = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const month = months[parts[0]] ?? 0;
    const day = parseInt(parts[1].replace(',', ''), 10);
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day, 12, 0, 0);
    return date.toUTCString();
  }

  return new Date().toUTCString();
}

// Extract blog posts from the data file
function getBlogPosts(): BlogPostData[] {
  try {
    const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
    const content = fs.readFileSync(blogPostsPath, 'utf-8');

    const posts: BlogPostData[] = [];

    // Extract individual fields using separate regex patterns
    const idMatches = Array.from(content.matchAll(/id:\s*(\d+)/g));
    const titleMatches = Array.from(content.matchAll(/title:\s*"([^"]+)"/g));
    const excerptMatches = Array.from(content.matchAll(/excerpt:\s*"([^"]+)"/g));
    const authorMatches = Array.from(content.matchAll(/author:\s*"([^"]+)"/g));
    const dateMatches = Array.from(content.matchAll(/date:\s*"([^"]+)"/g));
    const imageMatches = Array.from(content.matchAll(/imageUrl:\s*"([^"]+)"/g));
    const tagsMatches = Array.from(content.matchAll(/tags:\s*\[([^\]]+)\]/g));
    const publishDateMatches = Array.from(content.matchAll(/publishDate:\s*"([^"]+)"/g));

    const count = Math.min(
      idMatches.length,
      titleMatches.length,
      excerptMatches.length,
      authorMatches.length,
      dateMatches.length,
      imageMatches.length,
      tagsMatches.length
    );

    for (let i = 0; i < count; i++) {
      const tagsStr = tagsMatches[i][1];
      const tags = tagsStr.match(/"([^"]+)"/g)?.map(t => t.replace(/"/g, '')) || [];

      const publishDate = publishDateMatches[i]?.[1] || '';

      posts.push({
        id: parseInt(idMatches[i][1], 10),
        title: titleMatches[i][1],
        excerpt: excerptMatches[i][1],
        content: '',
        date: dateMatches[i][1],
        author: authorMatches[i][1],
        imageUrl: imageMatches[i][1],
        tags,
        publishDate
      });
    }

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate RSS XML
function generateRSS(posts: BlogPostData[]): string {
  const now = new Date().toUTCString();

  // Extract slugs for URL generation
  const blogPostsPath2 = path.join(__dirname, '../src/data/blogPosts.ts');
  const rawContent = fs.readFileSync(blogPostsPath2, 'utf-8');
  const slugMatches = Array.from(rawContent.matchAll(/slug:\s*"([^"]+)"/g)).map(m => m[1]);
  const idToSlug: Record<number, string> = {};
  const idRegex = Array.from(rawContent.matchAll(/id:\s*(\d+)/g)).map(m => parseInt(m[1], 10));
  for (let i = 0; i < idRegex.length && i < slugMatches.length; i++) {
    idToSlug[idRegex[i]] = slugMatches[i];
  }

  const items = posts.map(post => {
    const slug = idToSlug[post.id] || String(post.id);
    const postUrl = `${SITE_URL}/blog/${slug}`;
    const pubDate = parseToRFC822(post.date);
    const categories = post.tags.map(tag => `    <category>${escapeXml(tag)}</category>`).join('\n');

    return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${postUrl}</link>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${pubDate}</pubDate>
    <guid isPermaLink="true">${postUrl}</guid>
    <author>contact@businessesbeyondborders.com (${escapeXml(post.author)})</author>
${categories}
    <enclosure url="${post.imageUrl}" type="image/jpeg" />
  </item>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>${escapeXml(SITE_TITLE)}</title>
  <link>${SITE_URL}/blog</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>en-us</language>
  <lastBuildDate>${now}</lastBuildDate>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
  <image>
    <url>${SITE_URL}/bbb-logo.png</url>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
  </image>
  <copyright>Copyright ${new Date().getFullYear()} Businesses Beyond Borders. All rights reserved.</copyright>
  <managingEditor>contact@businessesbeyondborders.com (Businesses Beyond Borders)</managingEditor>
  <webMaster>contact@businessesbeyondborders.com (Businesses Beyond Borders)</webMaster>
  <ttl>60</ttl>

${items}

</channel>
</rss>`;
}

// Main execution
function main() {
  console.log('Generating rss.xml...');

  const posts = getBlogPosts();

  if (posts.length === 0) {
    console.error('No blog posts found!');
    process.exit(1);
  }

  // Filter out scheduled (future) posts
  const today = new Date().toISOString().split('T')[0];
  const publishedPosts = posts.filter(p => !p.publishDate || p.publishDate <= today);

  // Sort by date (newest first)
  publishedPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const rssXml = generateRSS(publishedPosts);

  // Write to public folder
  const outputPath = path.join(__dirname, '../public/rss.xml');
  fs.writeFileSync(outputPath, rssXml, 'utf-8');

  console.log(`RSS feed generated successfully!`);
  console.log(`Total posts: ${publishedPosts.length} published (${posts.length - publishedPosts.length} scheduled)`);
  console.log(`Output: ${outputPath}`);
}

main();
