/**
 * Card Component (Molecule)
 * Basic card container with optional padding and shadow
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false,
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };
  
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl',
  };
  
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`bg-white rounded-2xl overflow-hidden ${paddingStyles[padding]} ${shadowStyles[shadow]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;

