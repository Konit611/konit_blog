/**
 * Common Types
 * General-purpose types used across the application
 */

import { ReactNode } from 'react';

export type SupportedLocale = 'ko' | 'en' | 'zh' | 'ja';

export interface LayoutProps {
  children: ReactNode;
  locale: SupportedLocale;
}

export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface PageProps<T = object> {
  params: Promise<T & { locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string | string[];
  locale: string;
  type?: 'website' | 'article';
  image?: string;
  author?: string;
}

export interface PaginationResult<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
}

