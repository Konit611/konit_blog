import { Category } from '../types';

// Static categories data - this can be used on both client and server
const CATEGORIES_DATA: Category[] = [
  {
    id: 'adventure',
    name: {
      en: 'Adventure',
      ko: '모험',
      zh: '冒险',
      ja: 'アドベンチャー'
    },
    description: {
      en: 'Thrilling adventures and outdoor activities',
      ko: '스릴 넘치는 모험과 야외 활동',
      zh: '刺激的冒险和户外活动',
      ja: 'スリリングな冒険とアウトドア活動'
    }
  },
  {
    id: 'culture',
    name: {
      en: 'Culture',
      ko: '문화',
      zh: '文化',
      ja: '文化'
    },
    description: {
      en: 'Local culture, traditions, and heritage',
      ko: '현지 문화, 전통, 유산',
      zh: '当地文化、传统和遗产',
      ja: '地元の文化、伝統、遺産'
    }
  },
  {
    id: 'food',
    name: {
      en: 'Food',
      ko: '음식',
      zh: '美食',
      ja: '料理'
    },
    description: {
      en: 'Local cuisine and culinary experiences',
      ko: '현지 요리와 미식 경험',
      zh: '当地美食和烹饪体验',
      ja: '地元料理と料理体験'
    }
  },
  {
    id: 'nature',
    name: {
      en: 'Nature',
      ko: '자연',
      zh: '自然',
      ja: '自然'
    },
    description: {
      en: 'Natural landscapes and wildlife',
      ko: '자연 경관과 야생동물',
      zh: '自然景观和野生动物',
      ja: '自然の風景と野生動物'
    }
  },
  {
    id: 'city',
    name: {
      en: 'City',
      ko: '도시',
      zh: '城市',
      ja: '都市'
    },
    description: {
      en: 'Urban exploration and city life',
      ko: '도시 탐험과 도시 생활',
      zh: '城市探索和城市生活',
      ja: '都市探索と都市生活'
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