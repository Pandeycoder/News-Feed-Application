import dotenv from "dotenv";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();
// Get the directory name for the current module
// Use this
const __dirname = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/[A-Za-z]:/, "")
);

// Dynamically resolve the path to the .env file (relative to the current module's directory)
const envPath = path.resolve(__dirname, "../../../.env");

console.log("Resolved .env path:", envPath);

console.log(
  "Environment variables loaded:",
  process.env.SERVER_URL,
  process.env.PORT
);

// OpenAPI 3.0 specification using swagger-jsdoc
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "News-Feed ",
    version: "1.0.0",
    description: "API documentation for the shopping module.",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/api/v1`, // Local development server
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  definitions: {
    AuthResponse: {
      type: "object",
      properties: {
        token: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
        user: {
          type: "object",
          properties: {
            id: { type: "string", example: "12345" },
            email: { type: "string", example: "user@example.com" },
          },
        },
      },
    },
  },
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: [
    path.resolve(__dirname, "../../route/**/*.js"), // Go up two levels to reach the main src folder
    path.resolve(__dirname, "../../controllers/**/*.js"), // Go up two levels to reach the main src folder
  ],
};

console.log(
  "Resolved routes path:",
  path.resolve(__dirname, "../../routes/**/*.js")
);
console.log(
  "Resolved controllers path:",
  path.resolve(__dirname, "../../controllers/**/*.js")
);

// Initialize swagger-jsdoc to generate the Swagger spec
export const swaggerSpec = swaggerJSDoc(options);

// Log environment variables for debugging
console.log("Environment variables loaded:", {
  SERVER_URL: process.env.SERVER_URL,
  PORT: process.env.PORT || 4000,
});

console.log("Swagger Paths:", JSON.stringify(swaggerSpec.paths, null, 2));

console.log("Swagger Configuration:", options);
