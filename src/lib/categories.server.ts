import { Category, ParentCategory } from '../types';
import fs from 'fs';
import path from 'path';

let CATEGORIES_DATA: Category[] | null = null;
let PARENT_CATEGORIES_DATA: ParentCategory[] | null = null;

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
    return [];
  }
}

/**
 * Load parent categories from JSON file (Server-side only)
 */
function loadParentCategoriesData(): ParentCategory[] {
  if (PARENT_CATEGORIES_DATA) {
    return PARENT_CATEGORIES_DATA;
  }

  try {
    const parentCategoriesPath = path.join(process.cwd(), 'data', 'parent-categories.json');
    const fileContents = fs.readFileSync(parentCategoriesPath, 'utf8');
    PARENT_CATEGORIES_DATA = JSON.parse(fileContents);
    return PARENT_CATEGORIES_DATA!;
  } catch (error) {
    console.error('Error loading parent categories data:', error);
    return [];
  }
}

/**
 * Get all parent categories (Server-side only)
 */
export function getParentCategories(): ParentCategory[] {
  return loadParentCategoriesData();
}

/**
 * Get a specific parent category by its ID (Server-side only)
 */
export function getParentCategoryById(id: string): ParentCategory | undefined {
  return loadParentCategoriesData().find(category => category.id === id);
}

/**
 * Get all categories (Server-side only)
 */
export function getCategories(): Category[] {
  return loadCategoriesData();
}

/**
 * Get child categories for a specific parent category (Server-side only)
 */
export function getChildCategories(parentId: string): Category[] {
  return loadCategoriesData().filter(category => category.parentId === parentId);
}

/**
 * Get a specific category by its ID (Server-side only)
 */
export function getCategoryById(id: string): Category | undefined {
  return loadCategoriesData().find(category => category.id === id);
}

/**
 * Get the parent category for a specific category (Server-side only)
 */
export function getParentCategoryForCategory(categoryId: string): ParentCategory | undefined {
  const category = getCategoryById(categoryId);
  if (!category) return undefined;
  return getParentCategoryById(category.parentId);
}

/**
 * Get the localized name for a parent category (Server-side only)
 */
export function getParentCategoryName(id: string, locale: string): string {
  const category = getParentCategoryById(id);
  if (!category) {
    return id;
  }
  
  return category.name[locale] || category.name.en || category.name[Object.keys(category.name)[0]] || id;
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
 * Get category path (breadcrumb) - returns [ParentCategory, Category] (Server-side only)
 */
export function getCategoryPath(categoryId: string, locale: string): Array<{id: string, name: string}> {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  const parent = getParentCategoryById(category.parentId);
  if (!parent) return [{ id: categoryId, name: getCategoryName(categoryId, locale) }];
  
  return [
    { id: parent.id, name: getParentCategoryName(parent.id, locale) },
    { id: category.id, name: getCategoryName(categoryId, locale) }
  ];
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

/**
 * Get parent categories with their localized names (Server-side only)
 */
export function getParentCategoriesWithLocalizedNames(locale: string): Array<{id: string, name: string, description?: string, icon?: string, color?: string}> {
  return loadParentCategoriesData().map(category => ({
    id: category.id,
    name: getParentCategoryName(category.id, locale),
    description: category.description?.[locale] || category.description?.en,
    icon: category.icon,
    color: category.color
  }));
} 