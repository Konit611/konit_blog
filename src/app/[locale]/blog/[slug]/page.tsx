import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, markdownToHtml } from '../../../../lib/markdown';

import { getCategoryName } from '../../../../lib/categories';
import { Metadata } from 'next';
import React from 'react';
import { Layout } from '../../../../components/Layout';

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
        <div className="flex items-start px-0 py-12 relative self-stretch w-full flex-[0_0_auto] z-[2]">
          <div className="flex flex-col items-start relative flex-1 grow max-w-[80%] mx-auto">
            {/* Article Header */}
            <div className="px-0 py-10 z-[4] flex flex-col items-center gap-8 relative self-stretch w-full flex-[0_0_auto] bg-white">
              <div className="flex flex-col max-w-[1000px] items-start gap-6 relative w-full flex-[0_0_auto]">
                <div className="relative self-stretch mt-[-1.00px] font-outfit font-medium text-[#d62500] text-[15px] tracking-[0] leading-5 overflow-hidden text-ellipsis">
                  {post.categories.map(cat => getCategoryName(cat, locale)).join(', ')}
                </div>

                <h1 className="relative self-stretch font-domine font-bold text-[#271c1a] text-5xl tracking-[-0.96px] leading-[52px]">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="relative self-stretch font-outfit font-normal text-[#271c1a] text-xl tracking-[0] leading-6">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Author Info */}
              <div className="flex flex-col max-w-[1000px] items-start gap-5 relative w-full flex-[0_0_auto] bg-white">
                <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto] bg-white">
                  <div className="relative w-9 h-9 rounded-[999px] bg-gray-300 bg-cover bg-[50%_50%]" />

                  <div className="flex flex-col w-[248px] items-start relative self-stretch">
                    <div className="relative self-stretch mt-[-1.00px] font-outfit font-semibold text-[#271c1a] text-[13px] tracking-[0] leading-4 overflow-hidden text-ellipsis">
                      {post.author || 'Travel Blogger'}
                    </div>
                    <div className="relative self-stretch font-outfit font-normal text-[#2e18139e] text-[13px] tracking-[0] leading-4 overflow-hidden text-ellipsis">
                      {authorRole}
                    </div>
                  </div>
                </div>

                <div className="relative self-stretch font-outfit font-normal text-[#271c1a] text-[15px] tracking-[0] leading-5 overflow-hidden text-ellipsis">
                  {new Date(post.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="flex flex-col items-center justify-center px-0 py-8 relative self-stretch w-full flex-[0_0_auto] z-[2] bg-white">
                <div 
                  className="relative w-[1000px] h-[600px] ml-[-108.00px] mr-[-108.00px] rounded-lg border-[1.5px] border-solid border-transparent bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                />
              </div>
            )}

            {/* Article Content */}
            <div className="z-[1] flex flex-col items-center gap-8 px-0 py-[52px] relative self-stretch w-full flex-[0_0_auto] bg-white">
              <div 
                className="markdown-content max-w-[1000px] w-full"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="relative self-stretch w-full h-12 z-[1] bg-white" />
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