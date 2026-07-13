import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUrl: string = process.env.DB_URL || "";

const connectDB = async (retries = 5, delay = 2000): Promise<void> => {
  if (!dbUrl) {
    throw new Error("DB_URL is not defined in environment variables");
  }

  try {
    const data = await mongoose.connect(dbUrl);
    console.log(`Database connected with ${data.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (retries > 0) {
      console.log(`Retrying in ${delay / 1000}s... (${retries} attempts left)`);
      setTimeout(() => connectDB(retries - 1, delay * 2), delay);
    } else {
      console.error("Max retries reached. Exiting process.");
      process.exit(1);
    }
  }
};

export default connectDB;
