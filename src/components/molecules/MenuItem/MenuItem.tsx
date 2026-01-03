/**
 * MenuItem Component (Molecule)
 * Navigation menu item
 */

import React from 'react';
import { Link } from '@/components/atoms';

export interface MenuItemProps {
  href: string;
  label: string;
  active?: boolean;
  external?: boolean;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  href,
  label,
  active = false,
  external = false,
  onClick,
}) => {
  const activeStyles = active ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900';
  
  return (
    <Link
      href={href}
      external={external}
      className={`font-medium transition-colors duration-200 ${activeStyles}`}
    >
      <span onClick={onClick}>{label}</span>
    </Link>
  );
};

export default MenuItem;

