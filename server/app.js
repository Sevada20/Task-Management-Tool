import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authenticate } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/users.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "mongodb+srv://admin:1265789Sevo.@cluster0.dstygcr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticate, taskRoutes);
app.use("/api/users", authenticate, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
