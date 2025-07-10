//throw new Error("🔥 이 파일이 로드되면 무조건 에러남");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

console.log("User 모델 로드됨")
module.exports = mongoose.model("Users", userSchema, "users");