/**
 * Date Utilities
 * Functions for date formatting and manipulation
 */

/**
 * Format a date string based on locale
 */
export function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date to a short format (YYYY-MM-DD)
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return locale === 'ko' ? '오늘' : 
           locale === 'ja' ? '今日' :
           locale === 'zh' ? '今天' : 'Today';
  }
  
  if (diffInDays === 1) {
    return locale === 'ko' ? '어제' :
           locale === 'ja' ? '昨日' :
           locale === 'zh' ? '昨天' : 'Yesterday';
  }
  
  if (diffInDays < 7) {
    return locale === 'ko' ? `${diffInDays}일 전` :
           locale === 'ja' ? `${diffInDays}日前` :
           locale === 'zh' ? `${diffInDays}天前` : `${diffInDays} days ago`;
  }
  
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return locale === 'ko' ? `${weeks}주 전` :
           locale === 'ja' ? `${weeks}週間前` :
           locale === 'zh' ? `${weeks}周前` : `${weeks} weeks ago`;
  }
  
  const months = Math.floor(diffInDays / 30);
  if (months < 12) {
    return locale === 'ko' ? `${months}개월 전` :
           locale === 'ja' ? `${months}ヶ月前` :
           locale === 'zh' ? `${months}个月前` : `${months} months ago`;
  }
  
  const years = Math.floor(diffInDays / 365);
  return locale === 'ko' ? `${years}년 전` :
         locale === 'ja' ? `${years}年前` :
         locale === 'zh' ? `${years}年前` : `${years} years ago`;
}

/**
 * Get year from date string
 */
export function getYear(dateString: string): number {
  return new Date(dateString).getFullYear();
}

/**
 * Get month from date string (1-12)
 */
export function getMonth(dateString: string): number {
  return new Date(dateString).getMonth() + 1;
}

/**
 * Check if a date is in the past
 */
export function isPast(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

/**
 * Check if a date is in the future
 */
export function isFuture(dateString: string): boolean {
  return new Date(dateString) > new Date();
}

