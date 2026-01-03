/**
 * Link Component (Atom)
 * Navigation link with Next.js Link
 */

import React from 'react';
import NextLink from 'next/link';

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  external = false,
  className = '',
}) => {
  const baseStyles = 'text-blue-600 hover:text-blue-800 transition-colors duration-200';
  
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {children}
      </a>
    );
  }
  
  return (
    <NextLink href={href} className={`${baseStyles} ${className}`}>
      {children}
    </NextLink>
  );
};

export default Link;

