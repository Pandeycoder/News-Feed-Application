import express from "express";

import morgan from "morgan";
import cors from "cors";
import cookiesParser from "cookie-parser";
import path from "path";
import mainRoutes from "./route/index.js"; // Ensure correct file extension (.js)

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.options("*", cors());
app.use(cookiesParser());
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Default route to check server
app.get("/", (req, res) => {
  return res.json(200, {
    message: "Welcome to the server! Everything is running smoothly.",
    status: "okay",
    statusCode: "200",
  });
});

// Use your routes
app.use("/api/v1/", mainRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(error(500, "Something broke!"));
});

export default app; // Export app to be used in server.js
