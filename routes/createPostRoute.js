const express = require('express');
const router = express.Router();
const postController = require('../controllers/createPostController');
//뭐지 엄마없나
router.post('/posts', postController.createPost);

module.exports = router;
