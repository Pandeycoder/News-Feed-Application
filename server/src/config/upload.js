import { v2 as cloudinary } from "cloudinary"; // ES6 import for Cloudinary

const uploadImage = async (filePath, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: "Books",
      resource_type: "auto",
    });
    return result.secure_url; // URL of the uploaded image
  } catch (error) {
    throw new Error("Error uploading to Cloudinary");
  }
};

export { uploadImage }; // ES6 export
