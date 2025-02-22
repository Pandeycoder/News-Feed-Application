import React from 'react';
import { useSelector } from 'react-redux';
import { NewsCard } from '../components/NewsCard';
import Footer from '../components/Footer';

export const Trending = () => {
  const trending = useSelector((state) => state.news.trending);

  // Temporary mock data for trending news
  const mockTrending = {
    id: '4',
    title: 'Revolutionary Quantum Computing Breakthrough',
    content: 'Scientists achieve major milestone in quantum computing, demonstrating unprecedented quantum coherence...',
    category: 'Tech',
    author: 'Jane Smith',
    publishedAt: '2024-03-15T12:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    likes: 892,
    views: 5600
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Trending News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard news={mockTrending} />
          <NewsCard news={{
            ...mockTrending,
            id: '5',
            title: 'Global Climate Summit Results',
            category: 'Science',
            imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51'
          }} />
          <NewsCard news={{
            ...mockTrending,
            id: '6',
            title: 'Cryptocurrency Market Analysis',
            category: 'Business',
            imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040'
          }} />
        </div>
      </main>
      <Footer />
    </>
  );
};