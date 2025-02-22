import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Eye, Share2, Clock } from "lucide-react";

export const NewsDetail = () => {
  const { id } = useParams();

  // In a real app, you would fetch the specific news item from your Redux store or API
  const mockNews = {
    id: id,
    title: "The Future of AI in 2024",
    content: `Artificial Intelligence continues to evolve at an unprecedented pace, transforming industries and daily life. The latest developments in machine learning and neural networks have opened up new possibilities that were once considered science fiction.

    Recent breakthroughs in natural language processing have enabled more sophisticated human-computer interactions, while advances in computer vision are revolutionizing everything from autonomous vehicles to medical diagnostics.

    Industry experts predict that 2024 will be a pivotal year for AI adoption across various sectors, with particular emphasis on:

    • Healthcare: AI-powered diagnostic tools and personalized treatment plans
    • Finance: Advanced algorithmic trading and fraud detection systems
    • Education: Adaptive learning platforms and automated assessment tools
    • Manufacturing: Smart factories and predictive maintenance
    
    However, these advancements also raise important questions about ethics, privacy, and the future of human work in an increasingly automated world.`,
    category: "Tech",
    author: "John Doe",
    publishedAt: "2024-03-15T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    likes: 245,
    views: 1200,
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to News Feed
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={mockNews.imageUrl}
          alt={mockNews.title}
          className="w-full h-[400px] object-cover"
        />

        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {mockNews.category}
            </span>
            <span className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(mockNews.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{mockNews.title}</h1>

          <div className="flex items-center mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt={mockNews.author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{mockNews.author}</p>
              <p className="text-sm text-gray-500">Technology Reporter</p>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            {mockNews.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-gray-600 hover:text-red-600">
                <Heart className="w-5 h-5 mr-1" />
                <span>{mockNews.likes}</span>
              </button>
              <div className="flex items-center text-gray-600">
                <Eye className="w-5 h-5 mr-1" />
                <span>{mockNews.views}</span>
              </div>
            </div>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 className="w-5 h-5 mr-1" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
