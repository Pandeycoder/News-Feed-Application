// route.js
import express from "express";
import { getGreeting } from "../controller/user.js";

const router = express.Router();
/**
 * @swagger
 * /api/greet:
 *   get:
 *     summary: Get a greeting message
 *     tags:
 *       - Greeting
 *     responses:
 *       200:
 *         description: Successfully retrieved greeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, Welcome!"
 */
router.get("/greet", getGreeting);

export default router;
