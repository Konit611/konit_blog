'use client';

import { useState, useEffect } from 'react';
import { PostMetadata, Category, ParentCategory } from '@/types';
import CategoryFilter from '@/components/CategoryFilter';
import ContentCard from '@/components/ContentCard';
import { getCategoryName } from '../../../lib/categories';
import Layout from '@/components/layout/Layout';
import { useTranslation } from '@/components/I18nProvider';

interface BlogClientProps {
  posts: PostMetadata[];
  categories: Category[];
  parentCategories: ParentCategory[];
  locale: string;
}

const POSTS_PER_PAGE = 9; // 3x3 grid

export default function BlogClient({ posts, categories, parentCategories, locale }: BlogClientProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredPosts = selectedCategory
    ? posts.filter(post => {
        // 선택된 것이 대분류인지 중분류인지 확인
        const isParentCategory = parentCategories.some(p => p.id === selectedCategory);
        
        if (isParentCategory) {
          // 대분류 선택: 해당 대분류에 속한 모든 중분류의 글 표시
          const childCategoryIds = categories
            .filter(cat => cat.parentId === selectedCategory)
            .map(cat => cat.id);
          
          return post.categories.some(cat => 
            childCategoryIds.includes(cat.toLowerCase())
          );
        } else {
          // 중분류 선택: 해당 중분류의 글만 표시
          return post.categories.some(cat => 
            cat.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
      })
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

  return (
    <Layout locale={locale}>
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">{t('categories.allCategories')}</h2>
            <CategoryFilter
              locale={locale}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              allOptionText={t('blog.allPosts')}
              className="mb-4"
              categories={categories}
              parentCategories={parentCategories}
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
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map(post => (
                  <ContentCard
                    key={post.slug}
                    type="blog"
                    slug={post.slug}
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    categories={post.categories}
                    locale={locale}
                    getCategoryName={(categoryId) => getCategoryName(categoryId, locale, categories)}
                    readTime={post.readTime}
                    moreText={t('blog.readMore')}
                    readTimeText={(time) => t('blog.readTime', { time })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-base sm:text-lg">
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
            <div className="mt-8 sm:mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium ${
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
                        <span key={page} className="px-2 sm:px-3 py-2 text-gray-400">
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
                      className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium ${
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
                  className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium ${
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