/**
 * Heading Component (Atom)
 * Semantic heading elements (h1-h6)
 */

import React from 'react';

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
}) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  const styles = {
    1: 'text-4xl sm:text-5xl font-bold text-gray-900',
    2: 'text-3xl sm:text-4xl font-semibold text-gray-800',
    3: 'text-2xl sm:text-3xl font-semibold text-gray-800',
    4: 'text-xl sm:text-2xl font-medium text-gray-700',
    5: 'text-lg sm:text-xl font-medium text-gray-700',
    6: 'text-base sm:text-lg font-medium text-gray-600',
  };
  
  return (
    <Tag className={`${styles[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
