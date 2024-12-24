require("dotenv").config();
const { authenticate } = require("./middleware/auth");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

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
