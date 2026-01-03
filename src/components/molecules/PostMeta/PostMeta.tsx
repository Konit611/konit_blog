/**
 * PostMeta Component (Molecule)
 * Displays post metadata (date, category, read time)
 */

import React from 'react';
import { Text, Badge, Icon } from '@/components/atoms';
import { formatDate } from '@/utils/date.utils';

export interface PostMetaProps {
  date: string;
  locale: string;
  category?: string;
  readTime?: number;
  readTimeText?: string;
  className?: string;
}

export const PostMeta: React.FC<PostMetaProps> = ({
  date,
  locale,
  category,
  readTime,
  readTimeText,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 flex-wrap text-sm text-gray-600 ${className}`}>
      {/* Date */}
      <div className="flex items-center gap-1">
        <Icon name="calendar" size="sm" />
        <Text variant="small" color="muted" as="span">
          {formatDate(date, locale)}
        </Text>
      </div>
      
      {/* Category */}
      {category && (
        <>
          <span className="text-gray-300">|</span>
          <Badge variant="primary" size="sm">
            {category}
          </Badge>
        </>
      )}
      
      {/* Read Time */}
      {readTime && readTimeText && (
        <>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <Icon name="clock" size="sm" />
            <Text variant="small" color="muted" as="span">
              {readTimeText}
            </Text>
          </div>
        </>
      )}
    </div>
  );
};

export default PostMeta;

