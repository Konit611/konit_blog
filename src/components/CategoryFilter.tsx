'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { Category, ParentCategory } from '../types';
import { getCategoriesWithLocalizedNames, getParentCategoriesWithLocalizedNames, getChildCategories } from '../lib/categories';

interface CategoryFilterProps {
  locale: string;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  className?: string;
  showAllOption?: boolean;
  allOptionText?: string;
  categories: Category[];
  parentCategories: ParentCategory[];
}

export default function CategoryFilter({
  locale,
  selectedCategory,
  onCategoryChange,
  className = '',
  showAllOption = true,
  allOptionText = 'All Posts',
  categories: categoriesData,
  parentCategories: parentCategoriesData
}: CategoryFilterProps) {
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [parentCategories, setParentCategories] = useState<Array<{id: string, name: string, description?: string, icon?: string, color?: string}>>([]);
  const [childCategories, setChildCategories] = useState<Array<{id: string, name: string, description?: string}>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const localizedParents = getParentCategoriesWithLocalizedNames(locale, parentCategoriesData);
      setParentCategories(localizedParents);
    } catch (error) {
      console.error('Error loading parent categories:', error);
      setParentCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, [locale, parentCategoriesData]);

  useEffect(() => {
    if (selectedParent) {
      const children = getChildCategories(selectedParent, categoriesData);
      const localizedChildren = getCategoriesWithLocalizedNames(locale, children);
      setChildCategories(localizedChildren);
    } else {
      setChildCategories([]);
    }
  }, [selectedParent, categoriesData, locale]);

  // Find parent of selected category
  useEffect(() => {
    if (selectedCategory) {
      const category = categoriesData.find(cat => cat.id === selectedCategory);
      if (category && category.parentId !== selectedParent) {
        setSelectedParent(category.parentId);
      }
    }
  }, [selectedCategory, categoriesData, selectedParent]);

  const handleParentClick = (parentId: string) => {
    if (selectedParent === parentId && !selectedCategory) {
      // 같은 대분류를 다시 클릭하고 중분류가 선택되지 않았으면 토글
      setSelectedParent(null);
      setChildCategories([]);
      onCategoryChange(null);
    } else {
      setSelectedParent(parentId);
      // 대분류 클릭 시 해당 대분류로 필터링 (모든 중분류 글 표시)
      onCategoryChange(parentId);
    }
  };

  const handleMobileSelectChange = (value: string) => {
    if (value === '') {
      setSelectedParent(null);
      onCategoryChange(null);
    } else {
      onCategoryChange(value);
    }
  };

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Mobile skeleton */}
        <div className="block md:hidden w-full h-12 bg-gray-200 rounded-lg animate-pulse" />
        
        {/* Desktop skeleton */}
        <div className="hidden md:flex flex-wrap gap-2">
          {[110, 95, 120].map((width, index) => (
            <div
              key={index}
              className="h-12 bg-gray-200 rounded-lg animate-pulse"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* 모바일 드롭다운 (768px 미만) */}
      <div className="block md:hidden">
        <select
          value={selectedCategory || ''}
          onChange={(e) => handleMobileSelectChange(e.target.value)}
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.5rem',
            paddingRight: '2.5rem'
          }}
        >
          {showAllOption && (
            <option value="">📚 {allOptionText}</option>
          )}
          
          {parentCategories.map((parent) => {
            const children = getChildCategories(parent.id, categoriesData);
            const localizedChildren = getCategoriesWithLocalizedNames(locale, children);
            
            return (
              <React.Fragment key={parent.id}>
                {/* 대분류 옵션 */}
                <option value={parent.id}>
                  {parent.icon || ''} {parent.name}
                </option>
                {/* 중분류 옵션들 */}
                {localizedChildren.map((child) => (
                  <option key={child.id} value={child.id}>
                    &nbsp;&nbsp;├─ {child.name}
                  </option>
                ))}
              </React.Fragment>
            );
          })}
        </select>
      </div>

      {/* 데스크톱 버튼 (768px 이상) */}
      <div className="hidden md:block space-y-3">
        {/* 대분류 (Parent Categories) */}
        <div className="flex flex-wrap gap-3">
          {showAllOption && (
            <button
              onClick={() => {
                setSelectedParent(null);
                onCategoryChange(null);
              }}
              className={`px-8 py-3.5 rounded-md text-base font-medium transition-all duration-200 ${
                selectedCategory === null && selectedParent === null
                  ? 'bg-gray-700 text-white'
                  : 'bg-bg-base text-gray-800 border border-gray-400'
              }`}
            >
              {allOptionText}
            </button>
          )}
          
          {parentCategories.map((parent) => (
            <button
              key={parent.id}
              onClick={() => handleParentClick(parent.id)}
              title={parent.description}
              className={`px-8 py-3.5 rounded-md text-base font-medium transition-all duration-200 ${
                selectedParent === parent.id
                  ? 'bg-gray-700 text-white'
                  : 'bg-bg-base text-gray-800 border border-gray-400'
              }`}
            >
              {parent.name}
            </button>
          ))}
        </div>

        {/* 중분류 (Child Categories) */}
        {selectedParent && childCategories.length > 0 && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onCategoryChange(selectedParent)}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === selectedParent
                  ? 'bg-gray-700 text-white'
                  : 'bg-bg-base text-gray-800 border border-gray-400'
              }`}
            >
              All
            </button>
            {childCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                title={category.description}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gray-700 text-white'
                    : 'bg-bg-base text-gray-800 border border-gray-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
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