/**
 * Footer Organism
 * Site footer with branding, description, and social links
 */

import React from 'react';
import { Heading, Text } from '@/components/atoms';
import { SocialLinks, SocialLink } from '@/components/molecules';

interface FooterProps {
  locale?: string;
  translations: {
    brand: string;
    description: string;
  };
  socialLinks?: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ 
  translations, 
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/konit611', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/konit611', icon: 'external' },
  ]
}) => {
  const t = translations;

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start">
        {/* 브랜드 로고 */}
        <div className="flex items-center">
          <Heading 
            level={2} 
            className="font-serif font-medium text-[32px] md:text-[42px] tracking-[-1.68px] leading-tight"
          >
            {t.brand}
          </Heading>
        </div>

        {/* 설명 텍스트 */}
        <div className="flex flex-col gap-2">
          <Text as="div" className="font-semibold text-[15px] leading-5">
            {t.brand}
          </Text>
          <Text as="p" className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
            {t.description}
          </Text>
        </div>

        {/* 소셜 아이콘 */}
        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
};

export default Footer;

