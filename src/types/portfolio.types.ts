/**
 * Portfolio Types
 * Types related to portfolio items
 */

export interface Portfolio {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  tech: string[];
  projectUrl?: string;
  githubUrl?: string;
  content: string;
  order?: number;
  featured?: boolean;
  date: string;
  relatedPosts?: string[];
}

export interface PortfolioMetadata {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  tech: string[];
  projectUrl?: string;
  githubUrl?: string;
  order?: number;
  featured?: boolean;
  date: string;
  relatedPosts?: string[];
}

