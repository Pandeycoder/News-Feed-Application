// src/routes/staff/demo.js
import express from "express";
import { DemoController } from "../../controllers/news/demo.js"; // Correct import path

const router = express.Router();

// /**
//  * @swagger
//  * /demo:
//  *   get:
//  *     summary: Retrieve demo data
//  *     tags:
//  *       - Demo
//  *     responses:
//  *       200:
//  *         description: Success
//  */
router.get("/", DemoController);

export default router;
