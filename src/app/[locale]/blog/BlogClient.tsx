'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PostMetadata, Category } from '@/types';
import CategoryFilter from '@/components/CategoryFilter';
import { getCategoryName } from '../../../lib/categories';
import { Layout } from '@/components/Layout';
import { useTranslation } from '@/components/I18nProvider';

interface BlogClientProps {
  posts: PostMetadata[];
  categories: Category[];
  locale: string;
}

const POSTS_PER_PAGE = 9; // 3x3 grid

export default function BlogClient({ posts, categories, locale }: BlogClientProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Ensure we're on the client side to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Handle image error
  const handleImageError = (postSlug: string) => {
    setImageErrors(prev => ({ ...prev, [postSlug]: true }));
  };

  const filteredPosts = selectedCategory
    ? posts.filter(post => 
        post.categories.some(cat => 
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      )
    : posts;

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of posts section
    document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const formatDate = (dateString: string) => {
    if (!isClient) {
      // Return a simple format for SSR to prevent hydration mismatch
      return new Date(dateString).toISOString().split('T')[0];
    }
    
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout locale={locale}>
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">{t('categories.allCategories')}</h2>
            <CategoryFilter
              locale={locale}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              allOptionText={t('blog.allPosts')}
              className="mb-4"
              categories={categories}
            />
            
            {/* Stats */}
            <div className="text-sm text-gray-600 mt-4">
              {filteredPosts.length > 0 ? (
                <>
                  {t('blog.showingPosts', { count: filteredPosts.length })}
                  {selectedCategory && (
                    <span> {t('blog.inCategory', { category: getCategoryName(selectedCategory, locale, categories) })}</span>
                  )}
                </>
              ) : (
                <span>
                  {selectedCategory 
                    ? t('blog.noPostsInCategory', { category: getCategoryName(selectedCategory, locale, categories) })
                    : t('blog.noPostsAvailable')
                  }
                </span>
              )}
            </div>
          </div>

          {/* Posts Grid */}
          <div id="posts-section">
            {currentPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map(post => (
                  <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Post Image */}
                    <div className="aspect-video overflow-hidden">
                      <a href={`/${locale}/blog/${post.slug}`}>
                        {post.coverImage && !imageErrors[post.slug] ? (
                          <Image 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={400}
                            height={225}
                            onError={() => handleImageError(post.slug)}
                            priority={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center hover:from-green-500 hover:to-blue-700 transition-colors">
                            <div className="text-white text-lg font-semibold text-center px-4 line-clamp-3">
                              {post.title}
                            </div>
                          </div>
                        )}
                      </a>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map(category => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                            title={`Filter by ${getCategoryName(category, locale, categories)}`}
                          >
                            {getCategoryName(category, locale, categories)}
                          </button>
                        ))}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3">
                        {formatDate(post.date)}
                        {post.readTime && (
                          <span className="ml-2">• {t('blog.readTime', { time: post.readTime })}</span>
                        )}
                      </p>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <a 
                        href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {t('blog.readMore')}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  {selectedCategory 
                    ? t('blog.noPostsInCategory', { category: getCategoryName(selectedCategory, locale, categories) })
                    : t('blog.noPostsAvailable')
                  }
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current page
                  const showPage = page === 1 || 
                                  page === totalPages || 
                                  (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  if (!showPage) {
                    // Show ellipsis for gaps
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-3 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          )}

          {/* Pagination Info */}
          {totalPages > 1 && (
            <div className="mt-4 text-center text-sm text-gray-600">
              {t('blog.paginationInfo', { 
                currentPage, 
                totalPages, 
                startIndex: startIndex + 1, 
                endIndex: Math.min(endIndex, filteredPosts.length), 
                total: filteredPosts.length 
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 