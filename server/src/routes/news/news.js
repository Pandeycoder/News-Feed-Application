// src/routes/news/news.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {
  getAllNews,
  getTrendingNews,
  createNews,
  likeNews,
  incrementViewCount,
} from "../../controllers/news/news.js";
import { upload } from "../../config/cloud.js"; // Correct import using ES6 syntax

const router = express.Router();

// Routes
router.get("/", getAllNews); // Get all news articles
router.get("/trending", getTrendingNews); // Get trending news
router.post("/", upload.single("image"), createNews); // Handle image upload and create news
router.put("/:id/like", likeNews); // Like a news article
router.put("/:id/view", incrementViewCount); // Increment view count

export default router;
