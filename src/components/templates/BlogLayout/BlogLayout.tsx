/**
 * BlogLayout Template
 * Layout for blog listing with filters and pagination
 */

import React from 'react';
import { PageLayout } from '../PageLayout';
import { BlogFilters, PostCard } from '@/components/organisms';
import { Pagination } from '@/components/molecules';
import { Heading, Text } from '@/components/atoms';
import { PostMetadata } from '@/types/post.types';

interface BlogLayoutProps {
  locale: string;
  translations: {
    header: {
      brand: string;
      nav: {
        home: string;
        blog: string;
        portfolio: string;
        career: string;
        contact: string;
      };
    };
    footer: {
      brand: string;
      description: string;
    };
    blog: {
      title: string;
      description: string;
      allLabel: string;
      readTime: string;
    };
  };
  categories: Array<{ id: string; name: string }>;
  posts: PostMetadata[];
  currentCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  locale,
  translations,
  categories,
  posts,
  currentCategory,
  onCategoryChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <PageLayout locale={locale} translations={translations}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="mb-12 text-center">
          <Heading level={1} className="font-serif font-bold text-4xl sm:text-5xl mb-4">
            {translations.blog.title}
          </Heading>
          <Text as="p" className="text-gray-600 text-lg">
            {translations.blog.description}
          </Text>
        </div>

        {/* 카테고리 필터 */}
        <BlogFilters
          categories={categories}
          activeCategory={currentCategory}
          onCategoryChange={onCategoryChange}
          allLabel={translations.blog.allLabel}
        />

        {/* 포스트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              date={post.date}
              categories={post.categories}
              locale={locale}
              readTime={post.readTime}
              readTimeText={translations.blog.readTime}
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default BlogLayout;

