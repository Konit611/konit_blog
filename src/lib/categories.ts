import { Category } from '../types';

// Static categories data - this can be used on both client and server
const CATEGORIES_DATA: Category[] = [
  {
    id: 'ios',
    name: {
      en: 'iOS',
      ko: 'iOS',
      zh: 'iOS',
      ja: 'iOS'
    },
    description: {
      en: 'iOS development',
      ko: 'iOS 개발',
      zh: 'iOS 开发',
      ja: 'iOS 開発'
    }
  },
  {
    id: 'ai',
    name: {
      en: 'AI',
      ko: 'AI',
      zh: 'AI',
      ja: 'AI'
    },
    description: {
      en: 'AI Development',
      ko: 'AI 개발',
      zh: 'AI 开发',
      ja: 'AI 開発'
    }
  },
  {
    id: 'math',
    name: {
      en: 'Math',
      ko: '수학',
      zh: '数学',
      ja: '数学'
    },
    description: {
      en: 'Mathmatics for AI development',
      ko: 'AI 개발을 위한 수학',
      zh: 'AI 开发所需的数学',
      ja: 'AI 開発に必要な数学'
    }
  },
  {
    id: 'statistics',
    name: {
      en: 'Statistics',
      ko: '통계',
      zh: '统计',
      ja: '統計'
    },
    description: {
      en: 'Statistics for AI development',
      ko: 'AI 개발을 위한 통계',
      zh: 'AI 开发所需的统计',
      ja: 'AI 開発に必要な統計'
    }
  },
  {
    id: 'infra',
    name: {
      en: 'Infrastructure',
      ko: '인프라',
      zh: '基础设施',
      ja: 'インフラ'
    },
    description: {
      en: 'Infrastructure for AI development',
      ko: 'AI 개발을 위한 인프라',
      zh: 'AI 开发所需的基础设施',
      ja: 'AI 開発に必要なインフラ'
    }
  }
];

/**
 * Get all categories (client-safe version)
 */
export function getCategories(): Category[] {
  return CATEGORIES_DATA;
}

/**
 * Get a specific category by its ID
 */
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES_DATA.find(category => category.id === id);
}

/**
 * Get the localized name for a category
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
 * Get the localized description for a category
 */
export function getCategoryDescription(id: string, locale: string): string | undefined {
  const category = getCategoryById(id);
  if (!category || !category.description) {
    return undefined;
  }
  
  return category.description[locale] || category.description.en || category.description[Object.keys(category.description)[0]];
}

/**
 * Check if a category exists
 */
export function categoryExists(id: string): boolean {
  return getCategoryById(id) !== undefined;
}

/**
 * Get all category IDs
 */
export function getCategoryIds(): string[] {
  return CATEGORIES_DATA.map(category => category.id);
}

/**
 * Get categories with their localized names
 */
export function getCategoriesWithLocalizedNames(locale: string): Array<{id: string, name: string, description?: string}> {
  return CATEGORIES_DATA.map(category => ({
    id: category.id,
    name: getCategoryName(category.id, locale),
    description: getCategoryDescription(category.id, locale)
  }));
} 