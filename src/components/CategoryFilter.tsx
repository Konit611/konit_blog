'use client';
import { useState, useEffect } from 'react';
import { Category } from '../types';
import { getCategoriesWithLocalizedNames } from '../lib/categories';

interface CategoryFilterProps {
  locale: string;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  className?: string;
  showAllOption?: boolean;
  allOptionText?: string;
  categories: Category[];
}

export default function CategoryFilter({
  locale,
  selectedCategory,
  onCategoryChange,
  className = '',
  showAllOption = true,
  allOptionText = 'All Posts',
  categories: categoriesData
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<Array<{id: string, name: string, description?: string}>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const localizedCategories = getCategoriesWithLocalizedNames(locale, categoriesData);
      setCategories(localizedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, [locale, categoriesData]);

  if (isLoading) {
    const skeletonWidths = [110, 95, 120, 85, 105, 130];
    
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {/* Loading skeleton */}
        {skeletonWidths.map((width, index) => (
          <div
            key={index}
            className="h-10 bg-gray-200 rounded-full animate-pulse"
            style={{ width: `${width}px` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {showAllOption && (
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {allOptionText}
        </button>
      )}
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          title={category.description}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

// Alternative dropdown version for mobile or compact layouts
interface CategoryDropdownProps {
  locale: string;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  className?: string;
  showAllOption?: boolean;
  allOptionText?: string;
  placeholder?: string;
  categories: Category[];
}

export function CategoryDropdown({
  locale,
  selectedCategory,
  onCategoryChange,
  className = '',
  showAllOption = true,
  allOptionText = 'All Posts',
  categories: categoriesData
}: CategoryDropdownProps) {
  const [categories, setCategories] = useState<Array<{id: string, name: string, description?: string}>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const localizedCategories = getCategoriesWithLocalizedNames(locale, categoriesData);
      setCategories(localizedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, [locale, categoriesData]);

  if (isLoading) {
    return (
      <div className={`w-48 h-10 bg-gray-200 rounded-md animate-pulse ${className}`} />
    );
  }

  return (
    <select
      value={selectedCategory || ''}
      onChange={(e) => onCategoryChange(e.target.value || null)}
      className={`px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    >
      {showAllOption && (
        <option value="">{allOptionText}</option>
      )}
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
} 