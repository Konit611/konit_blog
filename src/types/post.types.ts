/**
 * Post Types
 * Types related to blog posts
 */

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  categories: string[];
  content: string;
  author?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  categories: string[];
  author?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
}

