const AuctionBid = require("../models/auctionModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const createAuctionMessage = async (req, res) => {
  try {
    const { postID, UserID, auctionPrice } = req.body;

    if (!postID || !UserID || !auctionPrice) {
      return res.status(400).json({ message: "필수값이 누락되었습니다." });
    }

    if (typeof auctionPrice !== "number" || isNaN(auctionPrice)) {
     return res.status(400).json({ message: "입찰가는 숫자 형식이어야 합니다." });
    }

    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ message: "경매 게시글을 찾을 수 없습니다." });
    }

    const now = new Date();
    if (now < post.auctionPeriod.startDate || now > post.auctionPeriod.endDate) {
      return res.status(400).json({ message: "현재는 경매 기간이 아닙니다." });
    }

    console.log("🧪 isAuctionEnded:", post.isAuctionEnded, "| typeof:", typeof post.isAuctionEnded);
    if (post.isAuctionEnded) {
      return res.status(400).json({ message: "이미 종료된 경매입니다." });
    }

    // 📌 최소 입찰가 확인
    if (auctionPrice < post.minimumPrice) {
      return res.status(400).json({
        message: `입찰가는 최소 ${post.minimumPrice}원 이상이어야 합니다.`,
      });
    }


    const lastBid = await AuctionBid.findOne({ postID }).sort({ createdAt: -1 });
    if (lastBid && auctionPrice <= lastBid.auctionPrice) {
      return res.status(400).json({
        message: `입찰가는 마지막 입찰가(${lastBid.auctionPrice}원)보다 높아야 합니다.`,
      });
    }


    const user = await User.findById(UserID);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const pointValue = Number(user.point);
    console.log("🧪 user.point:", user.point, "| 변환된 값:", pointValue, "| typeof:", typeof pointValue);

    if (isNaN(pointValue)) {
      return res.status(500).json({ message: "유저 포인트 정보가 잘못되었습니다." });
    }

    if (pointValue < auctionPrice) {
      return res.status(400).json({
        message: `보유 포인트(${pointValue}원)가 부족합니다.`,
      });
    }

    // ✅ 입찰 저장
    const newBid = new AuctionBid({ postID, UserID, auctionPrice });
    await newBid.save();

    res.status(201).json({ message: "입찰 성공", bid: newBid });
  } catch (err) {
    console.error("❌ 입찰 오류:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

module.exports = { createAuctionMessage };