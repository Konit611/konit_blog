import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, markdownToHtml } from '../../../../lib/markdown';
import { getCategoryPath } from '../../../../lib/categories';
import { getCategories, getParentCategories } from '../../../../lib/categories.server';
import { Metadata } from 'next';
import React from 'react';
import Layout from '../../../../components/layout/Layout';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { locale, slug } = await params;
    const post = getPostBySlug(slug, locale);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
    const canonicalUrl = `${siteUrl}/${locale}/blog/${slug}`;
    
    return {
      title: `${post.title} - Tech Blog`,
      description: post.excerpt || `Read about ${post.title} on our tech blog.`,
      alternates: {
        canonical: canonicalUrl,
      },
      icons: {
        icon: '/favicon.ico',
      },
    };
  } catch {
    return {
      title: 'Post Not Found - Tech Blog',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { locale, slug } = await params;
    const post = getPostBySlug(slug, locale);
    const htmlContent = await markdownToHtml(post.content);
    const categories = getCategories();
    const parentCategories = getParentCategories();
    
    // Get breadcrumb path for the first category
    const categoryPath = post.categories.length > 0 
      ? getCategoryPath(post.categories[0], locale, categories, parentCategories)
      : [];
    
    // Simple author role mapping by locale
    const authorRoles = {
      ko: '블로그 작성자',
      en: 'Blog Author',
      zh: '博客作者',
      ja: 'ブログ著者'
    };
    const authorRole = authorRoles[locale as keyof typeof authorRoles] || 'Blog Author';

    return (
      <Layout locale={locale}>
        {/* Main Content */}
        <article className="w-full max-w-4xl mx-auto py-8 md:py-12">
          {/* Breadcrumb */}
          {categoryPath.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <a href={`/${locale}/blog`} className="hover:text-blue-600 transition-colors">
                Blog
              </a>
              {categoryPath.map((item, index) => (
                <React.Fragment key={item.id}>
                  <span className="text-gray-400">/</span>
                  <span className={index === categoryPath.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                    {item.name}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          )}
          
          {/* Article Header */}
          <header className="mb-8">

            {/* Title */}
            <h1 className="font-noto-serif font-bold text-gray-900 text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            {/* Author Info */}
            <div className="flex items-center gap-3 py-4 border-t border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">
                  {post.author || 'Konit'}
                </div>
                <div className="text-gray-600 text-sm">
                  {authorRole}
                </div>
              </div>
              <time className="text-gray-600 text-sm">
                {new Date(post.date).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8 md:mb-12">
              <div 
                className="w-full aspect-video rounded-lg bg-cover bg-center shadow-md"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </Layout>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }
}

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  try {
    const { locale } = await params;
    const posts = getAllPosts(locale);
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
} 