const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    db = client.db("myAppDB");
    console.log("📦 MongoDB 연결 성공");
  } catch (err) {
    console.error("❌ MongoDB 연결 실패:", err);
  }
};

module.exports = connectDB;