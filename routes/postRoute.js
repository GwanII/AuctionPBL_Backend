const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// 게시글 생성
router.post('/posts', postController.createPost);
// 게시글 삭제
router.delete('/posts/:id', postController.deletePost);

module.exports = router;