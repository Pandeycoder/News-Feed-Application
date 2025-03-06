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

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API for managing news articles
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Successfully retrieved all news articles
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllNews);

/**
 * @swagger
 * /news/trending:
 *   get:
 *     summary: Get trending news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Successfully retrieved trending news
 *       500:
 *         description: Internal server error
 */
router.get("/trending", getTrendingNews);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a news article
 *     tags: [News]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Breaking News"
 *               content:
 *                 type: string
 *                 example: "This is the content of the news article."
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *               category:
 *                 type: string
 *                 example: "Sports"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: News article created successfully
 *       400:
 *         description: Bad request, missing fields
 *       500:
 *         description: Internal server error
 */
router.post("/", upload.single("image"), createNews);

/**
 * @swagger
 * /news/{id}/like:
 *   put:
 *     summary: Like a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the news article to like
 *     responses:
 *       200:
 *         description: News article liked successfully
 *       404:
 *         description: News article not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id/like", likeNews);

/**
 * @swagger
 * /news/{id}/view:
 *   put:
 *     summary: Increment view count of a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the news article to increment view count
 *     responses:
 *       200:
 *         description: View count incremented successfully
 *       404:
 *         description: News article not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id/view", incrementViewCount);

export default router;
