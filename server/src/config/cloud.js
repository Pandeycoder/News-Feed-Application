// src/config/cloud.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer Storage Configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "news", // Folder in Cloudinary to store uploaded files
    allowedFormats: ["jpg", "jpeg", "png"], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Multer instance for file upload
const upload = multer({ storage: storage });

export { cloudinary, upload }; // ES6 export
