import express from "express";

// Importing routes using import (ES module syntax)
import demo from "./news/demo.js";
import news from "./news/news.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Demo
 *   description: post, and user routes.
 */
router.use("/demo", demo);

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Authentication routing module that includes authentication, post, and user routes.
 */
router.use("/", news);

// Export the router (ES module export)
export default router;
