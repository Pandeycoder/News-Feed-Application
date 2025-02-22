import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    imageUrl: {
      type: String,
      default: null, // Default URL if no image is provided
    },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export { News };
