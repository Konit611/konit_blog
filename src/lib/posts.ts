import { Post, PostMetadata } from '../types';
import { 
  getAllPosts, 
  getAllPostMetadata, 
  getPostsByCategory, 
  getAllCategories,
  // getFeaturedPosts, // Commented out as it's exported from markdown.ts but not used elsewhere
  searchPosts 
} from './markdown';

/**
 * Get paginated posts for a locale
 */
export function getPaginatedPosts(
  locale: string, 
  page: number = 1, 
  postsPerPage: number = 10
): {
  posts: PostMetadata[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const allPosts = getAllPostMetadata(locale);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

/**
 * Get related posts based on categories and tags
 */
export function getRelatedPosts(
  currentPost: Post, 
  locale: string, 
  limit: number = 3
): PostMetadata[] {
  const allPosts = getAllPostMetadata(locale);
  
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
  
  // Score posts based on shared categories and tags
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Score for shared categories
    const sharedCategories = post.categories.filter(cat => 
      currentPost.categories.includes(cat)
    );
    score += sharedCategories.length * 2;
    
    // Score for shared tags
    if (post.tags && currentPost.tags) {
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags!.includes(tag)
      );
      score += sharedTags.length;
    }
    
    return { ...post, score };
  });
  
  // Sort by score (descending) and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      categories: post.categories,
      author: post.author,
      tags: post.tags,
      readTime: post.readTime
    }));
}

/**
 * Get previous and next posts for navigation
 */
export function getPrevNextPosts(
  currentSlug: string,
  locale: string
): {
  prevPost: PostMetadata | null;
  nextPost: PostMetadata | null;
} {
  const allPosts = getAllPostMetadata(locale);
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }
  
  return {
    prevPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    nextPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  };
}

/**
 * Get posts grouped by year
 */
export function getPostsByYear(locale: string): Record<string, PostMetadata[]> {
  const allPosts = getAllPostMetadata(locale);
  const postsByYear: Record<string, PostMetadata[]> = {};
  
  allPosts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });
  
  return postsByYear;
}

/**
 * Get posts grouped by month
 */
export function getPostsByMonth(locale: string, year?: number): Record<string, PostMetadata[]> {
  const allPosts = getAllPostMetadata(locale);
  const postsByMonth: Record<string, PostMetadata[]> = {};
  
  allPosts
    .filter(post => {
      if (year) {
        return new Date(post.date).getFullYear() === year;
      }
      return true;
    })
    .forEach(post => {
      const date = new Date(post.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!postsByMonth[monthKey]) {
        postsByMonth[monthKey] = [];
      }
      postsByMonth[monthKey].push(post);
    });
  
  return postsByMonth;
}

/**
 * Get post statistics for a locale
 */
export function getPostStats(locale: string): {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  averageReadTime: number;
  postsByCategory: Record<string, number>;
  recentPosts: PostMetadata[];
} {
  const allPosts = getAllPosts(locale);
  const categories = getAllCategories();
  
  // Get all unique tags
  const allTags = new Set<string>();
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => allTags.add(tag));
    }
  });
  
  // Calculate average read time
  const totalReadTime = allPosts.reduce((sum, post) => sum + (post.readTime || 0), 0);
  const averageReadTime = Math.round(totalReadTime / allPosts.length);
  
  // Count posts by category
  const postsByCategory: Record<string, number> = {};
  categories.forEach(category => {
    postsByCategory[category] = getPostsByCategory(category, locale).length;
  });
  
  // Get recent posts (last 5)
  const recentPosts = getAllPostMetadata(locale).slice(0, 5);
  
  return {
    totalPosts: allPosts.length,
    totalCategories: categories.length,
    totalTags: allTags.size,
    averageReadTime,
    postsByCategory,
    recentPosts
  };
}

/**
 * Get popular posts (most categories/tags)
 */
export function getPopularPosts(locale: string, limit: number = 5): PostMetadata[] {
  const allPosts = getAllPostMetadata(locale);
  
  // Score posts based on number of categories and tags
  const scoredPosts = allPosts.map(post => {
    const categoryScore = post.categories.length;
    const tagScore = post.tags ? post.tags.length : 0;
    const score = categoryScore + tagScore;
    
    return { ...post, score };
  });
  
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      categories: post.categories,
      author: post.author,
      tags: post.tags,
      readTime: post.readTime
    }));
}

/**
 * Search and filter posts with advanced options
 */
export function searchAndFilterPosts(
  locale: string,
  options: {
    query?: string;
    category?: string;
    tag?: string;
    year?: number;
    sortBy?: 'date' | 'title' | 'readTime';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
  } = {}
): PostMetadata[] {
  let posts = getAllPostMetadata(locale);
  
  // Apply search query
  if (options.query) {
    const searchResults = searchPosts(options.query, locale);
    const searchSlugs = new Set(searchResults.map(p => p.slug));
    posts = posts.filter(post => searchSlugs.has(post.slug));
  }
  
  // Filter by category
  if (options.category) {
    posts = posts.filter(post => 
      post.categories.some(cat => 
        cat.toLowerCase() === options.category!.toLowerCase()
      )
    );
  }
  
  // Filter by tag
  if (options.tag) {
    posts = posts.filter(post => 
      post.tags && post.tags.some(tag => 
        tag.toLowerCase() === options.tag!.toLowerCase()
      )
    );
  }
  
  // Filter by year
  if (options.year) {
    posts = posts.filter(post => 
      new Date(post.date).getFullYear() === options.year
    );
  }
  
  // Sort posts
  if (options.sortBy) {
    posts.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;
      
      switch (options.sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'readTime':
          aValue = a.readTime || 0;
          bValue = b.readTime || 0;
          break;
        default:
          return 0;
      }
      
      if (options.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
  
  // Apply limit
  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }
  
  return posts;
} 