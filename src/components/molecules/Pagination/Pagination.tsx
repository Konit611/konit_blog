/**
 * Pagination Component (Molecule)
 * Page navigation with prev/next buttons
 */

import React from 'react';
import { Button } from '@/components/atoms';
import { Icon } from '@/components/atoms';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
}) => {
  if (totalPages <= 1) return null;
  
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 2 && currentPage > 3) {
        pages.push('...');
      }
      if (i >= 2 && i <= totalPages - 1) {
        pages.push(i);
      }
      if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pages.push('...');
      }
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2"
      >
        <Icon name="arrow-left" size="sm" />
      </Button>
      
      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center space-x-1">
          {renderPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                  ...
                </span>
              );
            }
            
            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;
            
            return (
              <Button
                key={pageNumber}
                variant={isActive ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className="min-w-[2.5rem]"
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>
      )}
      
      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2"
      >
        <Icon name="arrow-right" size="sm" />
      </Button>
    </nav>
  );
};

export default Pagination;

