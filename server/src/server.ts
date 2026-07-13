import dotenv from "dotenv";
//dot env config
dotenv.config();

import { app } from "./app.js";
import connectDB from "./utils/db.js";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { initSocketServer } from "./utils/socketServer.js";

const server = http.createServer(app);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

//connect socket
initSocketServer(server);

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

startServer();
