/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/server-sitemap-index.xml', // Exclude server-side sitemap
    '/api/*', // Exclude API routes
    '/_next/*', // Exclude Next.js internal files
    '/404', // Exclude error pages
    '/500'
  ],
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
      hreflang: 'x-default',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/en`,
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/ko`,
      hreflang: 'ko',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/zh`,
      hreflang: 'zh',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/ja`,
      hreflang: 'ja',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom transform function to handle i18n routes
    const defaultTransform = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };

    // Set different priorities based on page type
    if (path === '/' || path.match(/^\/(en|ko|zh|ja)$/)) {
      // Homepage - highest priority
      return {
        ...defaultTransform,
        priority: 1.0,
        changefreq: 'daily',
      };
    }

    if (path.includes('/blog/') && !path.endsWith('/blog')) {
      // Individual blog posts - high priority
      return {
        ...defaultTransform,
        priority: 0.8,
        changefreq: 'weekly',
      };
    }

    if (path.endsWith('/blog')) {
      // Blog listing pages - medium-high priority
      return {
        ...defaultTransform,
        priority: 0.7,
        changefreq: 'daily',
      };
    }

    if (path.endsWith('/contact')) {
      // Contact pages - medium priority
      return {
        ...defaultTransform,
        priority: 0.6,
        changefreq: 'monthly',
      };
    }

    // Default for other pages
    return {
      ...defaultTransform,
      priority: 0.5,
      changefreq: 'weekly',
    };
  },
  additionalPaths: async (config) => {
    // Add dynamic blog post paths
    const fs = require('fs');
    const path = require('path');
    
    const additionalPaths = [];
    const locales = ['en', 'ko', 'zh', 'ja'];
    
    try {
      // Add blog post paths for each locale (supporting category folders)
      for (const locale of locales) {
        const postsDirectory = path.join(process.cwd(), 'data', 'posts', locale);
        
        if (fs.existsSync(postsDirectory)) {
          // Check category folders
          const categories = ['ios', 'ai', 'math', 'statistics', 'infra'];
          for (const category of categories) {
            const categoryPath = path.join(postsDirectory, category);
            if (fs.existsSync(categoryPath)) {
              const files = fs.readdirSync(categoryPath);
              const markdownFiles = files.filter(file => file.endsWith('.md'));
              
              for (const file of markdownFiles) {
                const slug = file.replace(/\.md$/, '');
                additionalPaths.push({
                  loc: `/${locale}/blog/${slug}`,
                  changefreq: 'weekly',
                  priority: 0.8,
                  lastmod: new Date().toISOString(),
                });
              }
            }
          }
          
          // Also check root directory for backwards compatibility
          const rootFiles = fs.readdirSync(postsDirectory);
          const rootMarkdownFiles = rootFiles.filter(file => file.endsWith('.md'));
          
          for (const file of rootMarkdownFiles) {
            const slug = file.replace(/\.md$/, '');
            additionalPaths.push({
              loc: `/${locale}/blog/${slug}`,
              changefreq: 'weekly',
              priority: 0.8,
              lastmod: new Date().toISOString(),
            });
          }
        }
      }
    } catch (error) {
      console.warn('Error generating additional sitemap paths:', error);
    }
    
    return additionalPaths;
  },
}; 