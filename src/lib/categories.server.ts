import { Category } from '../types';
import fs from 'fs';
import path from 'path';

let CATEGORIES_DATA: Category[] | null = null;

/**
 * Load categories from JSON file (Server-side only)
 */
function loadCategoriesData(): Category[] {
  if (CATEGORIES_DATA) {
    return CATEGORIES_DATA;
  }

  try {
    const categoriesPath = path.join(process.cwd(), 'data', 'categories.json');
    const fileContents = fs.readFileSync(categoriesPath, 'utf8');
    CATEGORIES_DATA = JSON.parse(fileContents);
    return CATEGORIES_DATA!;
  } catch (error) {
    console.error('Error loading categories data:', error);
    // Return fallback categories if file cannot be read
    return [
      {
        id: 'general',
        name: {
          en: 'General',
          ko: '일반',
          zh: '一般',
          ja: '一般'
        },
        description: {
          en: 'General posts',
          ko: '일반 포스트',
          zh: '一般帖子',
          ja: '一般的な投稿'
        }
      }
    ];
  }
}

/**
 * Get all categories (Server-side only)
 */
export function getCategories(): Category[] {
  return loadCategoriesData();
}

/**
 * Get a specific category by its ID (Server-side only)
 */
export function getCategoryById(id: string): Category | undefined {
  return loadCategoriesData().find(category => category.id === id);
}

/**
 * Get the localized name for a category (Server-side only)
 */
export function getCategoryName(id: string, locale: string): string {
  const category = getCategoryById(id);
  if (!category) {
    // Return the ID as fallback if category not found
    return id;
  }
  
  // Try to get the name in the requested locale, fallback to English, then to ID
  return category.name[locale] || category.name.en || category.name[Object.keys(category.name)[0]] || id;
}

/**
 * Get the localized description for a category (Server-side only)
 */
export function getCategoryDescription(id: string, locale: string): string | undefined {
  const category = getCategoryById(id);
  if (!category || !category.description) {
    return undefined;
  }
  
  return category.description[locale] || category.description.en || category.description[Object.keys(category.description)[0]];
}

/**
 * Check if a category exists (Server-side only)
 */
export function categoryExists(id: string): boolean {
  return getCategoryById(id) !== undefined;
}

/**
 * Get all category IDs (Server-side only)
 */
export function getCategoryIds(): string[] {
  return loadCategoriesData().map(category => category.id);
}

/**
 * Get categories with their localized names (Server-side only)
 */
export function getCategoriesWithLocalizedNames(locale: string): Array<{id: string, name: string, description?: string}> {
  return loadCategoriesData().map(category => ({
    id: category.id,
    name: getCategoryName(category.id, locale),
    description: getCategoryDescription(category.id, locale)
  }));
} 