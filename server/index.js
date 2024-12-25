const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5175", "http://localhost:5173"], // добавьте все нужные порты
    credentials: true,
  })
);
