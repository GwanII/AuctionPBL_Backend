const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const createPostRoutes = require("./routes/postRoute");


dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api",postRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});