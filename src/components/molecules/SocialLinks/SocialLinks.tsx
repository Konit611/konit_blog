/**
 * SocialLinks Component (Molecule)
 * Social media icon links
 */

import React from 'react';
import { Icon } from '@/components/atoms';

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'external';
}

export interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-900 transition-colors"
          title={link.name}
        >
          <Icon name={link.icon} size="md" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;

