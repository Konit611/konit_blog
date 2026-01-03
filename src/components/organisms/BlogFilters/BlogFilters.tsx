/**
 * BlogFilters Organism
 * Category filters and search for blog posts
 */

'use client';

import React from 'react';
import { Button } from '@/components/atoms';

interface Category {
  id: string;
  name: string;
}

interface BlogFiltersProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  allLabel?: string;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  allLabel = 'All',
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Button
        variant={activeCategory === null ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange(null)}
      >
        {allLabel}
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default BlogFilters;

