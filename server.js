const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// ===========기능 추가 시 변경하는 곳=============================================================
const postRoute = require("./routes/postRoute");
const dibRoute = require("./routes/dibRoute");
// ================================================================================================


dotenv.config();

const app = express();
app.use(express.json());

connectDB();

// ===========기능 추가 시 변경하는 곳=============================================================
app.use("/api",postRoute);
app.use("/api",dibRoute);
// ================================================================================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});