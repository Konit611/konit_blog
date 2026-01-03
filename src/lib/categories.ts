import { Category, ParentCategory } from '../types';

/**
 * Get the localized name for a parent category (Client-safe version)
 */
export function getParentCategoryName(id: string, locale: string, parentCategories?: ParentCategory[]): string {
  if (!parentCategories) {
    return id;
  }

  const category = parentCategories.find(cat => cat.id === id);
  if (!category) {
    return id;
  }
  
  return category.name[locale] || category.name.en || category.name[Object.keys(category.name)[0]] || id;
}

/**
 * Get the localized name for a category (Client-safe version)
 */
export function getCategoryName(id: string, locale: string, categories?: Category[]): string {
  if (!categories) {
    // Return the ID as fallback if categories not provided
    return id;
  }

  const category = categories.find(cat => cat.id === id);
  if (!category) {
    // Return the ID as fallback if category not found
    return id;
  }
  
  // Try to get the name in the requested locale, fallback to English, then to ID
  return category.name[locale] || category.name.en || category.name[Object.keys(category.name)[0]] || id;
}

/**
 * Get the localized description for a category (Client-safe version)
 */
export function getCategoryDescription(id: string, locale: string, categories?: Category[]): string | undefined {
  if (!categories) {
    return undefined;
  }

  const category = categories.find(cat => cat.id === id);
  if (!category || !category.description) {
    return undefined;
  }
  
  return category.description[locale] || category.description.en || category.description[Object.keys(category.description)[0]];
}

/**
 * Get child categories for a specific parent (Client-safe version)
 */
export function getChildCategories(parentId: string, categories: Category[]): Category[] {
  return categories.filter(category => category.parentId === parentId);
}

/**
 * Get the parent category for a specific category (Client-safe version)
 */
export function getParentCategoryForCategory(categoryId: string, categories: Category[], parentCategories: ParentCategory[]): ParentCategory | undefined {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return undefined;
  return parentCategories.find(parent => parent.id === category.parentId);
}

/**
 * Get category path (breadcrumb) - returns [ParentCategory, Category] (Client-safe version)
 */
export function getCategoryPath(categoryId: string, locale: string, categories: Category[], parentCategories: ParentCategory[]): Array<{id: string, name: string}> {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  const parent = parentCategories.find(p => p.id === category.parentId);
  if (!parent) return [{ id: categoryId, name: getCategoryName(categoryId, locale, categories) }];
  
  return [
    { id: parent.id, name: getParentCategoryName(parent.id, locale, parentCategories) },
    { id: category.id, name: getCategoryName(categoryId, locale, categories) }
  ];
}

/**
 * Get categories with their localized names (Client-safe version)
 */
export function getCategoriesWithLocalizedNames(locale: string, categories: Category[]): Array<{id: string, name: string, description?: string}> {
  return categories.map(category => ({
    id: category.id,
    name: getCategoryName(category.id, locale, categories),
    description: getCategoryDescription(category.id, locale, categories)
  }));
}

/**
 * Get parent categories with their localized names (Client-safe version)
 */
export function getParentCategoriesWithLocalizedNames(locale: string, parentCategories: ParentCategory[]): Array<{id: string, name: string, description?: string, icon?: string, color?: string}> {
  return parentCategories.map(category => ({
    id: category.id,
    name: getParentCategoryName(category.id, locale, parentCategories),
    description: category.description?.[locale] || category.description?.en,
    icon: category.icon,
    color: category.color
  }));
} 