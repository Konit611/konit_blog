/**
 * Category Constants
 * Parent and child category IDs
 */

/**
 * Parent Category IDs
 */
export const PARENT_CATEGORY_IDS = ['planning', 'design', 'development'] as const;
export type ParentCategoryId = (typeof PARENT_CATEGORY_IDS)[number];

/**
 * Child Category IDs grouped by parent
 */
export const CHILD_CATEGORY_IDS = {
  planning: ['statistics', 'math'],
  design: ['blender'],
  development: ['ios', 'algorithm', 'ai'],
} as const;

/**
 * All Child Category IDs (flat)
 */
export const ALL_CHILD_CATEGORY_IDS = [
  ...CHILD_CATEGORY_IDS.planning,
  ...CHILD_CATEGORY_IDS.design,
  ...CHILD_CATEGORY_IDS.development,
] as const;

export type ChildCategoryId = (typeof ALL_CHILD_CATEGORY_IDS)[number];

/**
 * Category Icon Mapping
 */
export const CATEGORY_ICONS: Record<ParentCategoryId, string> = {
  planning: '📋',
  design: '🎨',
  development: '💻',
} as const;

/**
 * Category Color Mapping
 */
export const CATEGORY_COLORS: Record<ParentCategoryId, string> = {
  planning: '#3B82F6',
  design: '#EC4899',
  development: '#10B981',
} as const;

