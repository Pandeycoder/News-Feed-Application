import { News } from "../../models/news/news.js"; // Import the News model
import { uploadImage } from "../../config/upload.js"; // Import the image upload logic
import { io } from "../../server.js"; // Import Socket.io for real-time communication

export const createNews = async (req, res) => {
  try {
    console.log("Create news request received");

    // Check if a file is uploaded
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File received:", req.file); // Log the uploaded file information

    // Upload the image to Cloudinary
    const cloudinaryResponse = await uploadImage(req.file.path); // Ensure file path is passed
    console.log("Cloudinary response:", cloudinaryResponse); // Log the full Cloudinary response

    const newImageUrl = cloudinaryResponse; // Get the image URL
    console.log("Image URL from Cloudinary:", newImageUrl); // Log the URL

    // Check if required fields (title, content, author, and category) are provided
    const { title, content, author, category } = req.body;

    if (!title || !content || !author || !category) {
      console.log(
        "Missing required fields: title, content, author, or category"
      );
      return res
        .status(400)
        .json({ message: "Title, content, author, and category are required" });
    }

    // Create a new news article
    const newNews = new News({
      title,
      content,
      author, // Include author
      category, // Include category
      imageUrl: newImageUrl, // Store the Cloudinary image URL
    });

    console.log("Created News Object:", newNews); // Log the created news object

    // Save the news article to the database
    await newNews.save();

    // Emit event for real-time update (Socket.io)
    io.to(newNews.category).emit("articleCreated", newNews); // You can adjust event name accordingly

    // Return the success response
    res.status(201).json({
      message: "News article created successfully",
      news: newNews,
    });
  } catch (error) {
    console.error("Error creating news:", error); // Log error if something goes wrong
    res
      .status(500)
      .json({ message: "Error uploading news article", error: error.message });
  }
};

// Get all news articles
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Sort by creation date in descending order
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get trending news based on views and likes
export const getTrendingNews = async (req, res) => {
  try {
    const trendingNews = await News.aggregate([
      {
        $addFields: {
          score: {
            $add: [
              { $multiply: ["$views", 0.3] }, // Views contribute 30% to the score
              { $multiply: ["$likes", 0.7] }, // Likes contribute 70% to the score
            ],
          },
        },
      },
      { $sort: { score: -1 } }, // Sort by score in descending order
      { $limit: 10 }, // Limit to top 10 trending articles
    ]);
    res.json(trendingNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a news article
export const likeNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } }, // Increment the likes count
      { new: true }
    );

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    // Emit update for real-time clients
    io.to(news.category).emit("articleUpdated", news);

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Increment view count for a news article
export const incrementViewCount = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // Increment the view count
      { new: true }
    );

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
