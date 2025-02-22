import dotenv from "dotenv";
dotenv.config();

import app from "./app.js"; // Ensure correct file extension (.js)
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger/swagger.js";
import dbConnect from "./config/dbconnect.js";
import http from "http"; // Import http module
import { Server as socketIo } from "socket.io"; // Correct import for socket.io

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Serve the Swagger JSON spec at a new endpoint
app.get("/api/v1/api-docs.json", (req, res) => {
  const filteredSwaggerSpec = { ...swaggerSpec };

  // Remove any user-related sensitive information from the Swagger spec
  delete filteredSwaggerSpec.definitions.User; // If "User" model contains sensitive data like id and password
  delete filteredSwaggerSpec.paths["/api/v1/user"]; // If you have a user-related path, remove it or update it to exclude password

  res.json(filteredSwaggerSpec);
});

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerUrl: `${
      process.env.Swagger_JSON || "http://localhost:4000/api/v1/api-docs.json"
    }`,
    explorer: true,
    swaggerOptions: {
      docExpansion: "list",
      filter: true,
    },
  })
);

dbConnect()
  .then(() => {
    startServer(); // Start server only after successful DB connection
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Graceful shutdown handler
const shutdown = async () => {
  console.log("Shutting down server...");
  try {
    await mongoose.disconnect(); // Ensure MongoDB is properly disconnected
    console.log("Database disconnected");
    console.log("Cleanup completed. Exiting...");
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err.message);
    process.exit(1);
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

const PORT = process.env.PORT;

// Use a fallback value if SERVER_URL is not defined
const server_url = process.env.SERVER_URL
  ? `${process.env.SERVER_URL}`
  : "http://localhost:4000";

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new socketIo(server); // Instantiate socketIo here

// Set up the socket connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  io.to(news.category).emit("articleUpdated", news);
});

// Export io for usage in other files like news.js
export { io };

const startServer = () => {
  // Start the server with Socket.IO
  server.listen(PORT, () => {
    console.log(`Server is running on ${server_url}`);
  });
};
