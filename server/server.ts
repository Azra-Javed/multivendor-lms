import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./utils/db.js";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// connect db
connectDB();
