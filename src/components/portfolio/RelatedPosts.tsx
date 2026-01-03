import Link from 'next/link';

interface RelatedPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  categories: string[];
  readTime?: number;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  locale: string;
  translations: {
    title: string;
    readMore: string;
    minRead: string;
  };
}

export default function RelatedPosts({ posts, locale, translations }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="font-noto-serif font-bold text-gray-900 text-2xl md:text-3xl mb-6">
        {translations.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Cover Image */}
            {post.coverImage && (
              <div 
                className="w-full h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
            )}
            
            <div className="p-4">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.slice(0, 2).map((category, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Title */}
              <h3 className="font-noto-serif font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              
              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <time>{formatDate(post.date)}</time>
                {post.readTime && (
                  <span>{post.readTime} {translations.minRead}</span>
                )}
              </div>
              
              {/* Read More Link */}
              <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                {translations.readMore}
                <svg 
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

