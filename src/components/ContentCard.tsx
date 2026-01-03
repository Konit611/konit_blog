'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ContentCardProps {
  type: 'blog' | 'portfolio';
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  categories?: string[];
  locale: string;
  getCategoryName?: (categoryId: string) => string;
  // Portfolio 전용
  projectUrl?: string;
  githubUrl?: string;
  readTime?: number;
  // 번역 텍스트
  moreText?: string;
  viewDetailsText?: string;
  viewProjectText?: string;
  viewCodeText?: string;
  readTimeText?: (time: number) => string;
}

export default function ContentCard({
  type,
  slug,
  title,
  date,
  excerpt,
  coverImage,
  categories = [],
  locale,
  getCategoryName,
  projectUrl,
  githubUrl,
  readTime,
  moreText = 'More',
  viewDetailsText = 'View Details',
  viewProjectText = 'View Project',
  viewCodeText = 'View Code',
  readTimeText,
}: ContentCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const href = type === 'blog' 
    ? `/${locale}/blog/${slug}` 
    : `/${locale}/portfolio/${slug}`;
  
  const isPortfolio = type === 'portfolio';

  // Format date based on locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Cover Image */}
      <div className="aspect-video overflow-hidden bg-gray-100 shrink-0">
        <a href={href} className="block w-full h-full">
          {coverImage && !imageError ? (
            <Image 
              src={coverImage} 
              alt={title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              width={400}
              height={225}
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className={`w-full h-full ${
              isPortfolio 
                ? 'bg-gradient-to-br from-slate-400 to-slate-600 hover:from-slate-500 hover:to-slate-700' 
                : 'bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700'
            } flex items-center justify-center transition-colors`}>
              <div className="text-white text-base sm:text-lg font-semibold text-center px-4 line-clamp-3">
                {title}
              </div>
            </div>
          )}
        </a>
      </div>
      
      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Date and Category/Tech Meta */}
        <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm text-gray-500 font-light">
          <time dateTime={date}>{formatDate(date)}</time>
          {type === 'blog' && categories.length > 0 && getCategoryName && (
            <>
              <span>|</span>
              <span className="capitalize">{getCategoryName(categories[0])}</span>
            </>
          )}
        </div>
        
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          <a href={href} className="hover:text-blue-600 transition-colors">
            {title}
          </a>
        </h2>
        
        {/* Excerpt/Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        {/* Bottom Action Area */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
          {/* Left Side - Read Time (Blog) or External Links (Portfolio) */}
          <div className="flex items-center gap-3 min-h-[24px]">
            {type === 'blog' ? (
              readTime && readTimeText ? (
                <span className="text-xs sm:text-sm text-gray-500">
                  {readTimeText(readTime)}
                </span>
              ) : null
            ) : (
              (projectUrl || githubUrl) && (
                <div className="flex gap-3">
                  {projectUrl && (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title={viewProjectText}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors"
                      title={viewCodeText}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )
            )}
          </div>
          
          {/* Right Side - More Button */}
          <a 
            href={href}
            className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all shrink-0"
          >
            {isPortfolio ? viewDetailsText : moreText}
          </a>
        </div>
      </div>
    </article>
  );
}

