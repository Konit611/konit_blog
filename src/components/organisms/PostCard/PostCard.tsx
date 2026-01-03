/**
 * PostCard Organism
 * Complete blog post card with image, metadata, and content
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/molecules';
import { PostMeta } from '@/components/molecules';
import { Heading, Text, Badge } from '@/components/atoms';

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  categories: string[];
  locale: string;
  categoryLabel?: string;
  readTime?: number;
  readTimeText?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  slug,
  title,
  excerpt,
  coverImage,
  date,
  categories,
  locale,
  categoryLabel,
  readTime,
  readTimeText,
}) => {
  return (
    <Link href={`/${locale}/blog/${slug}`}>
      <Card hover padding="none" className="h-full overflow-hidden group">
        {/* 이미지 */}
        {coverImage && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* 컨텐츠 */}
        <div className="p-4 sm:p-6 flex flex-col gap-3">
          {/* 카테고리 뱃지 */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="primary" size="sm">
                  {categoryLabel || category}
                </Badge>
              ))}
            </div>
          )}
          
          {/* 제목 */}
          <Heading 
            level={3} 
            className="font-serif font-semibold text-xl sm:text-2xl leading-tight group-hover:text-blue-600 transition-colors"
          >
            {title}
          </Heading>
          
          {/* 요약 */}
          <Text as="p" className="text-gray-600 line-clamp-2">
            {excerpt}
          </Text>
          
          {/* 메타 정보 */}
          <PostMeta
            date={date}
            locale={locale}
            readTime={readTime}
            readTimeText={readTimeText}
            className="mt-auto pt-3 border-t border-gray-100"
          />
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;

