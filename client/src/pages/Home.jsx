import React from "react";
import { NewsCard } from "../components/NewsCard";
import { CategoryFilter } from "../components/CategoryFilter";

// Temporary mock data
const mockNews = {
  id: "1",
  title: "The Future of AI in 2024",
  content:
    "Artificial Intelligence continues to evolve at an unprecedented pace, transforming industries and daily life...",
  category: "Tech",
  author: "John Doe",
  publishedAt: "2024-03-15T10:00:00Z",
  imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  likes: 245,
  views: 1200,
};

export const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <CategoryFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsCard news={mockNews} />
        <NewsCard
          news={{
            ...mockNews,
            id: "2",
            title: "SpaceX Launches New Satellite",
            category: "Science",
          }}
        />
        <NewsCard
          news={{
            ...mockNews,
            id: "3",
            title: "Global Markets Update",
            category: "Business",
          }}
        />
      </div>
    </main>
  );
};
