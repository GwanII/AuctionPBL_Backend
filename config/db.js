const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("📦 Mongoose 연결 성공");
  } catch (err) {
    console.error("❌ Mongoose 연결 실패:", err);
  }
};

module.exports = connectDB;