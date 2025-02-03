const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://task-management-tool-git-main-sevada20s-projects.vercel.app",
      "https://task-management-tool-khaki.vercel.app/api",
      "https://task-management-tool-beige-rho.vercel.app",
      "https://task-management-tool-server.vercel.app/api",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
