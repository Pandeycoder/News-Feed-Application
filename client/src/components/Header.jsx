import React from "react";
import { Newspaper, TrendingUp, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-600"
      : "text-gray-600 hover:text-blue-600";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Newspaper className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">
              NewsStream
            </h1>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link to="/" className={`flex items-center ${isActive("/")}`}>
              <Newspaper className="h-5 w-5 mr-1" />
              <span>News</span>
            </Link>
            <Link
              to="/trending"
              className={`flex items-center ${isActive("/trending")}`}
            >
              <TrendingUp className="h-5 w-5 mr-1" />
              <span>Trending</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center ${isActive("/profile")}`}
            >
              <User className="h-5 w-5 mr-1" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
