/**
 * Text Component (Atom)
 * Basic text with variants
 */

import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'small' | 'caption';
  color?: 'default' | 'muted' | 'primary' | 'danger';
  className?: string;
  as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'default',
  className = '',
  as: Component = 'p',
}) => {
  const variantStyles = {
    body: 'text-base',
    small: 'text-sm',
    caption: 'text-xs',
  };
  
  const colorStyles = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    primary: 'text-blue-600',
    danger: 'text-red-600',
  };
  
  return (
    <Component className={`${variantStyles[variant]} ${colorStyles[color]} ${className}`}>
      {children}
    </Component>
  );
};

export default Text;

