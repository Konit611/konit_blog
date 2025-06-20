'use client';

import { useState, useEffect } from 'react';
import { PostMetadata } from '@/types';
import { HokkaidoTravel } from '@/components/HokkaidoTravel';

interface HomeClientProps {
  featuredPosts: PostMetadata[];
  locale: string;
}

export default function HomeClient({ locale }: HomeClientProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return <HokkaidoTravel locale={locale} />;
} 