import dotenv from "dotenv";
dotenv.config();

import app from "./app.js"; // Ensure correct file extension (.js)
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./doc/swagger/swagger.js";

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

  // You can remove any sensitive information here
  // For example: delete filteredSwaggerSpec.definitions.User; if User data is sensitive
  res.json(filteredSwaggerSpec);
});

// Set up Swagger UI to serve the interactive API documentation
app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true, // To enable exploring the API docs
    swaggerOptions: {
      docExpansion: "list", // Controls how the docs are displayed
      filter: true, // Allows filtering of the API docs
    },
  })
);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
