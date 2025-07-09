const Post = require('../models/createPostModel');
require('dotenv').config();

exports.createPost = async (req, res) => {
  const data = req.body;

  if (!data.postId || !data.title || !data.seller || !data.minimumPrice) {
    return res.status(400).json({
      status: "error",
      message: "필수 데이터가 누락되었습니다.",
    });
  }

  const newPost = new Post(data);

  try {
    await newPost.save();
    res.status(201).json({
      status: "success",
      postId: newPost.postId,
      message: "게시물 생성 완료",
    });
  } catch (err) {
    console.error("게시물 생성 오류:", err);
    res.status(500).json({
      status: "error",
      message: "게시물 생성 실패",
    });
  }
};