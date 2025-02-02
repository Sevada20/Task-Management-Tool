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
      "https://task-management-tool-git-main-sevada20s-projects.vercel.app",
      "http://localhost:5173",
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
