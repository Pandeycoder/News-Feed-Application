import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookiesParser from "cookie-parser";
import helmet from "helmet";
import path from "path";

import mainRoutes from "./routes/index.js"; // Ensure correct file extension (.js)

import { error, success } from "./utils/ResponseWapper.js"; // Ensure correct file extension

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// Middleware setup
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL1,
      process.env.CLIENT_URL2,
      process.env.CLIENT_URL3,
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(cookiesParser());
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Default route to check server
app.get("/", (req, res) => {
  return res.send(
    success(200, "Welcome to the server! Everything is running smoothly.")
  );
});

// Use your routes
app.use("/api/v1/", mainRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(error(500, "Something broke!"));
});

export default app; // Export app to be used in server.js
