/**
 * useFilters Hook
 * Custom hook for filtering logic (categories, search, etc.)
 */

'use client';

import { useState, useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FilterValue = any;

interface UseFiltersOptions<T> {
  items: T[];
  filterFn: (item: T, filters: Record<string, FilterValue>) => boolean;
  initialFilters?: Record<string, FilterValue>;
}

interface UseFiltersResult<T> {
  filteredItems: T[];
  filters: Record<string, FilterValue>;
  setFilter: (key: string, value: FilterValue) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  clearFilters: () => void;
  clearFilter: (key: string) => void;
}

export function useFilters<T>({
  items,
  filterFn,
  initialFilters = {},
}: UseFiltersOptions<T>): UseFiltersResult<T> {
  const [filters, setFiltersState] = useState<Record<string, FilterValue>>(initialFilters);

  // 필터링된 아이템들
  const filteredItems = useMemo(() => {
    return items.filter(item => filterFn(item, filters));
  }, [items, filters, filterFn]);

  // 단일 필터 설정
  const setFilter = (key: string, value: FilterValue) => {
    setFiltersState(prev => ({ ...prev, [key]: value }));
  };

  // 여러 필터 한번에 설정
  const setFilters = (newFilters: Record<string, FilterValue>) => {
    setFiltersState(newFilters);
  };

  // 모든 필터 초기화
  const clearFilters = () => {
    setFiltersState({});
  };

  // 특정 필터 초기화
  const clearFilter = (key: string) => {
    setFiltersState(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: removed, ...rest } = prev;
      return rest;
    });
  };

  return {
    filteredItems,
    filters,
    setFilter,
    setFilters,
    clearFilters,
    clearFilter,
  };
}

/**
 * useSearch Hook
 * Custom hook for search functionality
 */
export function useSearch<T>(
  items: T[],
  searchFn: (item: T, query: string) => boolean
) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchedItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }
    return items.filter(item => searchFn(item, searchQuery));
  }, [items, searchQuery, searchFn]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    searchedItems,
    clearSearch,
  };
}

