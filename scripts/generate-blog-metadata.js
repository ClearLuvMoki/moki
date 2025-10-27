// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '../src/content/blogs');
const blogFiles = fs.readdirSync(blogsDir).filter(file => file.endsWith('.mdx'));

const blogUrls = blogFiles.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    return `
    <url>
      <loc>https://moonquakes.online/blog/${slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
  `;
}).join('');

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moonquakes.online</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://moonquakes.online/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${blogUrls}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated at public/sitemap.xml');