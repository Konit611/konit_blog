import { Category } from '../types';

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
 * Get categories with their localized names (Client-safe version)
 */
export function getCategoriesWithLocalizedNames(locale: string, categories: Category[]): Array<{id: string, name: string, description?: string}> {
  return categories.map(category => ({
    id: category.id,
    name: getCategoryName(category.id, locale, categories),
    description: getCategoryDescription(category.id, locale, categories)
  }));
} 