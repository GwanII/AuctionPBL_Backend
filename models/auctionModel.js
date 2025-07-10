const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",  // 관련된 경매 게시글 모델 이름
    required: true
  },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",  // 입찰한 사용자 모델 이름
    required: true
  },
  auctionPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ 여기 순서 중요
const AuctionBid = mongoose.model("Auctions", auctionSchema);
module.exports = mongoose.model("Auctions", auctionSchema, "auctions");