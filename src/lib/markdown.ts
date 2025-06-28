import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Post, PostMetadata } from '../types';
import { getCategoryIds } from './categories.server';

const postsDirectory = path.join(process.cwd(), 'data/posts');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { visit } = require('unist-util-visit');

interface ASTNode {
  type: string;
  value?: string;
  url?: string;
  alt?: string;
  children?: ASTNode[];
}

interface ParentNode extends ASTNode {
  children: ASTNode[];
}

// Next.js Image를 위한 이미지 변환 플러그인
function remarkNextImage() {
  return (tree: ASTNode) => {
    visit(tree, 'image', (node: ASTNode) => {
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

    // Obsidian 스타일 이미지 문법 처리: ![[image.png|width]]
    visit(tree, 'text', (node: ASTNode, index: number, parent: ParentNode) => {
      if (node.value && node.value.includes('![[')) {
        const obsidianImageRegex = /!\[\[([^|\]]+)(?:\|(\d+))?\]\]/g;
        let match;
        const replacements = [];

        while ((match = obsidianImageRegex.exec(node.value)) !== null) {
          const [fullMatch, imageName, width] = match;
          const imageUrl = `/images/${imageName}`;
          const imageWidth = width ? `width: ${width}px; max-width: 100%;` : 'width: 100%;';
          
          replacements.push({
            original: fullMatch,
            replacement: `<img 
              src="${imageUrl}" 
              alt="${imageName}" 
              loading="lazy" 
              style="${imageWidth} height: auto; border-radius: 8px; margin: 1rem 0;" 
              class="blog-image"
            />`
          });
        }

        if (replacements.length > 0) {
          let newValue = node.value;
          replacements.forEach(({ original, replacement }) => {
            newValue = newValue.replace(original, replacement);
          });
          
          // HTML 노드로 변환
          parent.children[index] = {
            type: 'html',
            value: newValue
          };
        }
      }
    });
  };
}

/**
 * Get all post slugs for a specific locale (with category folder support)
 */
export function getPostSlugs(locale: string): string[] {
  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];
  
  const slugs: string[] = [];
  const categoryIds = getCategoryIds();
  
  // Check each category folder for posts
  for (const categoryId of categoryIds) {
    const categoryDir = path.join(localeDir, categoryId);
    if (fs.existsSync(categoryDir)) {
      const files = fs.readdirSync(categoryDir);
      files
        .filter(file => file.endsWith('.md'))
        .forEach(file => {
          slugs.push(file.replace(/\.md$/, ''));
        });
    }
  }
  
  // Also check root directory for backwards compatibility
  const rootFiles = fs.readdirSync(localeDir);
  rootFiles
    .filter(file => file.endsWith('.md'))
    .forEach(file => {
      slugs.push(file.replace(/\.md$/, ''));
    });
  
  return slugs;
}

/**
 * Get a single post by slug and locale (with category folder support)
 */
export function getPostBySlug(slug: string, locale: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const localeDir = path.join(postsDirectory, locale);
  
  // First try to find in category folders
  const categoryIds = getCategoryIds();
  for (const categoryId of categoryIds) {
    const categoryPath = path.join(localeDir, categoryId, `${realSlug}.md`);
    if (fs.existsSync(categoryPath)) {
      return parsePostFile(categoryPath, realSlug);
    }
  }
  
  // Then try root directory for backwards compatibility
  const rootPath = path.join(localeDir, `${realSlug}.md`);
  if (fs.existsSync(rootPath)) {
    return parsePostFile(rootPath, realSlug);
  }
  
  // Fallback to English if post doesn't exist in requested locale
  const enDir = path.join(postsDirectory, 'en');
  for (const categoryId of categoryIds) {
    const enCategoryPath = path.join(enDir, categoryId, `${realSlug}.md`);
    if (fs.existsSync(enCategoryPath)) {
      return parsePostFile(enCategoryPath, realSlug);
    }
  }
  
  const enRootPath = path.join(enDir, `${realSlug}.md`);
  if (fs.existsSync(enRootPath)) {
    return parsePostFile(enRootPath, realSlug);
  }
  
  throw new Error(`Post not found: ${slug} in ${locale} or en`);
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
 * Get posts by category (optimized for folder structure)
 */
export function getPostsByCategory(category: string, locale: string): Post[] {
  const localeDir = path.join(postsDirectory, locale);
  const categoryPath = path.join(localeDir, category.toLowerCase());
  const posts: Post[] = [];
  
  // First, get posts directly from category folder
  if (fs.existsSync(categoryPath)) {
    const files = fs.readdirSync(categoryPath);
    files
      .filter(file => file.endsWith('.md'))
      .forEach(file => {
        const slug = file.replace(/\.md$/, '');
        try {
          const post = parsePostFile(path.join(categoryPath, file), slug);
          posts.push(post);
        } catch (error) {
          console.warn(`Error reading post ${file}:`, error);
        }
      });
  }
  
  // Also check all posts for those with matching categories (for backwards compatibility)
  const allPosts = getAllPosts(locale);
  const additionalPosts = allPosts.filter(post => 
    post.categories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    ) && !posts.some(p => p.slug === post.slug)
  );
  
  posts.push(...additionalPosts);
  
  // Sort by date (newest first)
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
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