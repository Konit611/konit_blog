/**
 * Category Types
 * Types related to categories and parent categories
 */

export interface ParentCategory {
  id: string;
  name: Record<string, string>;
  description?: Record<string, string>;
  icon?: string;
  color?: string;
  order?: number;
}

export interface Category {
  id: string;
  parentId: string;
  name: Record<string, string>;
  description?: Record<string, string>;
}

