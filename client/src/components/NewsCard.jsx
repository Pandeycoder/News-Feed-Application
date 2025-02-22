import React from "react";
import { Heart, Eye, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export const NewsCard = ({ news }) => {
  return (
    <Link to={`/news/${news.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <span className="text-sm font-semibold text-blue-600">
            {news.category}
          </span>
          <h2 className="text-xl font-bold mt-2 mb-2">{news.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{news.content}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {news.likes}
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {news.views}
              </span>
            </div>
            <div className="flex items-center">
              <Share2 className="w-4 h-4 mr-1 cursor-pointer hover:text-blue-600" />
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
            <span>{news.author}</span>
            <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
