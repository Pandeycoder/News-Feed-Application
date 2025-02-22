import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../store/slices/newsSlice";

const categories = ["Tech", "Business", "Sports", "Entertainment", "Science"];

export const CategoryFilter = () => {
  const dispatch = useDispatch();
  const subscribedCategories = useSelector(
    (state) => state.news.subscribedCategories
  );

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => dispatch(toggleCategory(category))}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${subscribedCategories.includes(category)
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
