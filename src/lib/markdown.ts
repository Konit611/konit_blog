import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Post, PostMetadata } from '../types';
import { getCategoryIds } from './categories';

const postsDirectory = path.join(process.cwd(), 'data/posts');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { visit } = require('unist-util-visit');

// Next.js Image를 위한 이미지 변환 플러그인
function remarkNextImage() {
  return (tree: unknown) => {
    visit(tree, 'image', (node: { url?: string; alt?: string; type: string; value: string }) => {
      // 이미지 경로가 /images/로 시작하는 경우만 처리
      if (node.url && node.url.startsWith('/images/')) {
        // HTML로 변환할 때 Next.js Image 호환 속성 추가
        node.type = 'html';
        node.value = `<img 
          src="${node.url}" 
          alt="${node.alt || ''}" 
          loading="lazy" 
          style="width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;" 
          class="blog-image"
        />`;
      }
    });
  };
}

/**
 * Get all post slugs for a specific locale
 */
export function getPostSlugs(locale: string): string[] {
  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];
  return fs.readdirSync(localeDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

/**
 * Get a single post by slug and locale
 */
export function getPostBySlug(slug: string, locale: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, locale, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    // Fallback to English if post doesn't exist in requested locale
    const enPath = path.join(postsDirectory, 'en', `${realSlug}.md`);
    if (fs.existsSync(enPath)) {
      return parsePostFile(enPath, realSlug);
    }
    throw new Error(`Post not found: ${slug} in ${locale} or en`);
  }
  
  return parsePostFile(fullPath, realSlug);
}

/**
 * Parse a markdown file and extract frontmatter
 */
function parsePostFile(filePath: string, slug: string): Post {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Calculate read time (rough estimate: 200 words per minute)
  // Use frontmatter readTime if provided, otherwise calculate automatically
  const wordCount = content.split(/\s+/).length;
  const calculatedReadTime = Math.ceil(wordCount / 200);
  const readTime = data.readTime || calculatedReadTime;
  
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '',
    categories: data.categories || [],
    content,
    author: data.author,
    tags: data.tags || [],
    readTime
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
 * Get all posts for a locale, sorted by date (newest first)
 */
export function getAllPosts(locale: string): Post[] {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map(slug => getPostBySlug(slug, locale))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

/**
 * Get post metadata without content (for listing pages)
 */
export function getPostMetadata(slug: string, locale: string): PostMetadata {
  const post = getPostBySlug(slug, locale);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...metadata } = post;
  return metadata;
}

/**
 * Get all post metadata for a locale
 */
export function getAllPostMetadata(locale: string): PostMetadata[] {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map(slug => getPostMetadata(slug, locale))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string, locale: string): Post[] {
  const allPosts = getAllPosts(locale);
  return allPosts.filter(post => 
    post.categories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

/**
 * Get all unique categories from all posts
 */
export function getAllCategories(): string[] {
  // Return predefined categories from categories.ts
  return getCategoryIds();
}

/**
 * Get featured posts (posts with featured: true in frontmatter)
 */
export function getFeaturedPosts(locale: string, limit: number = 3): Post[] {
  const allPosts = getAllPosts(locale);
  return allPosts
    .filter(post => (post as Post & { featured?: boolean }).featured === true)
    .slice(0, limit);
}

/**
 * Search posts by title, excerpt, or content
 */
export function searchPosts(query: string, locale: string): Post[] {
  const allPosts = getAllPosts(locale);
  const searchTerm = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
} 