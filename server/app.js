import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { authenticate } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = require("./config/db");
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticate, taskRoutes);
app.use("/api/users", authenticate, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
