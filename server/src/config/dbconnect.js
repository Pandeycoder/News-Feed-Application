import mongoose from "mongoose"; // Ensure to import mongoose properly

const dbConnect = async () => {
  const MONGODB_URI = process.env.ATLASDB_URI;
  console.log(MONGODB_URI);

  const connectWithRetry = async () => {
    try {
      const connect = await mongoose.connect(MONGODB_URI);
      console.log(
        `Successfully connected to MongoDB! ${connect.connection.host}`
      );
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);

      // Retry logic after 5 seconds
      console.log("Retrying connection in 20 minutes ...");
      setTimeout(connectWithRetry, 200000);
    }
  };

  connectWithRetry();
};

export default dbConnect;
