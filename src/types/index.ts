// 기본 타입 정의
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
}

export interface Category {
  id: string;
  name: Record<string, string>;
  description?: Record<string, string>;
}

export interface Locale {
  [key: string]: string;
}

export interface LocaleData {
  [key: string]: string;
}

export type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja';

export interface LayoutProps {
  children: React.ReactNode;
  locale: SupportedLocale;
}

export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

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
}
