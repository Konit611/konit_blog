/**
 * Text Utilities
 * Functions for text manipulation and formatting
 */

/**
 * Calculate reading time based on word count
 */
export function calculateReadTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncate text to a specific length
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert string to slug format
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Remove HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Extract excerpt from content
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
  const plainText = stripHtml(content);
  return truncate(plainText, maxLength);
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Check if string is empty or whitespace only
 */
export function isEmpty(text: string): boolean {
  return !text || text.trim().length === 0;
}

/**
 * Replace placeholders in a string
 * Example: replacePlaceholders("Hello {name}", { name: "World" }) => "Hello World"
 */
export function replacePlaceholders(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return key in values ? String(values[key]) : match;
  });
}

