import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Portfolio, PortfolioMetadata } from '../types';

const portfolioDirectory = path.join(process.cwd(), 'data/portfolio');

// Next.js Image를 위한 이미지 변환 플러그인
function remarkNextImage() {
  return (tree: any) => {
    const { visit } = require('unist-util-visit');
    
    visit(tree, 'image', (node: any) => {
      // 이미지 경로가 /images/로 시작하는 경우만 처리
      if (node.url && node.url.startsWith('/images/')) {
        // HTML로 변환할 때 Next.js Image 호환 속성 추가
        node.type = 'html';
        node.value = `<img 
          src="${node.url}" 
          alt="${node.alt || ''}" 
          loading="lazy" 
          style="width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;" 
          class="portfolio-image"
        />`;
      }
    });
  };
}

/**
 * Get all portfolio slugs for a specific locale
 */
export function getPortfolioSlugs(locale: string): string[] {
  const localeDir = path.join(portfolioDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];
  return fs.readdirSync(localeDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

/**
 * Get a single portfolio item by slug and locale
 */
export function getPortfolioBySlug(slug: string, locale: string): Portfolio {
  // Remove any file extensions from slug (not just .md)
  const realSlug = slug.replace(/\.(md|jpg|png|gif|jpeg|webp)$/i, '');
  const fullPath = path.join(portfolioDirectory, locale, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    // Fallback to English if portfolio doesn't exist in requested locale
    const enPath = path.join(portfolioDirectory, 'en', `${realSlug}.md`);
    if (fs.existsSync(enPath)) {
      return parsePortfolioFile(enPath, realSlug);
    }
    throw new Error(`Portfolio not found: ${slug} in ${locale} or en`);
  }
  
  return parsePortfolioFile(fullPath, realSlug);
}

/**
 * Parse a portfolio markdown file and extract frontmatter
 */
function parsePortfolioFile(filePath: string, slug: string): Portfolio {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    coverImage: data.coverImage || '',
    tech: Array.isArray(data.tech) ? data.tech : [],
    projectUrl: data.projectUrl,
    githubUrl: data.githubUrl,
    content,
    order: data.order || 0,
    featured: data.featured || false,
    date: data.date || new Date().toISOString()
  };
}

/**
 * Convert markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(remarkNextImage)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}

/**
 * Get all portfolio items for a locale, sorted by order and date
 */
export function getAllPortfolio(locale: string): Portfolio[] {
  const slugs = getPortfolioSlugs(locale);
  const portfolios = slugs
    .map(slug => getPortfolioBySlug(slug, locale))
    .sort((a, b) => {
      // Sort by order first, then by date (newest first)
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0);
      }
      return a.date > b.date ? -1 : 1;
    });
  return portfolios;
}

/**
 * Get portfolio metadata without content (for listing pages)
 */
export function getPortfolioMetadata(slug: string, locale: string): PortfolioMetadata {
  const portfolio = getPortfolioBySlug(slug, locale);
  const { content, ...metadata } = portfolio;
  return metadata;
}

/**
 * Get all portfolio metadata for a locale
 */
export function getAllPortfolioMetadata(locale: string): PortfolioMetadata[] {
  const slugs = getPortfolioSlugs(locale);
  const portfolios = slugs
    .map(slug => getPortfolioMetadata(slug, locale))
    .sort((a, b) => {
      // Sort by order first, then by date (newest first)
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0);
      }
      return a.date > b.date ? -1 : 1;
    });
  return portfolios;
}

/**
 * Get featured portfolio items
 */
export function getFeaturedPortfolio(locale: string, limit: number = 3): Portfolio[] {
  const allPortfolios = getAllPortfolio(locale);
  return allPortfolios
    .filter(portfolio => portfolio.featured === true)
    .slice(0, limit);
}

/**
 * Get portfolio items by technology
 */
export function getPortfolioByTech(tech: string, locale: string): Portfolio[] {
  const allPortfolios = getAllPortfolio(locale);
  return allPortfolios.filter(portfolio => 
    portfolio.tech.some(t => 
      t.toLowerCase() === tech.toLowerCase()
    )
  );
}

/**
 * Search portfolio items by title, description, or content
 */
export function searchPortfolio(query: string, locale: string): Portfolio[] {
  const allPortfolios = getAllPortfolio(locale);
  const searchTerm = query.toLowerCase();
  
  return allPortfolios.filter(portfolio => 
    portfolio.title.toLowerCase().includes(searchTerm) ||
    portfolio.description.toLowerCase().includes(searchTerm) ||
    portfolio.content.toLowerCase().includes(searchTerm) ||
    portfolio.tech.some(tech => tech.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get all unique technologies from all portfolio items
 */
export function getAllTechnologies(locale: string): string[] {
  const allPortfolios = getAllPortfolio(locale);
  const allTech = new Set<string>();
  
  allPortfolios.forEach(portfolio => {
    portfolio.tech.forEach(tech => allTech.add(tech));
  });
  
  return Array.from(allTech).sort();
} 