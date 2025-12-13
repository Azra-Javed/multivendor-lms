import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./utils/db.js";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { initSocketServer } from "./utils/socketServer.js";

//dot env config
dotenv.config();

const server = http.createServer(app);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

//connect socket
initSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// connect db
connectDB();
