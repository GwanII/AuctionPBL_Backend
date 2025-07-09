const express = require('express');
const router = express.Router();
const postController = require('../controllers/createPostController');

router.post('/posts', postController.createPost);

module.exports = router;