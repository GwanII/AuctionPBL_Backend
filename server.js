const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//예시
// const userRoutes = require("./routes/user");
// const productRoutes = require("./routes/product");
const createPostRoutes = require("./routes/createPostRoute");

dotenv.config();

const app = express();
app.use(express.json());

// DB 연결
connectDB();

// 라우터 등록(예시)
// app.use("/api/user", userRoutes);
// app.use("/api/product", productRoutes);
app.use("/api",createPostRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});