const express = require('express');
const router = express.Router();
const postController = require('../controllers/createpostController');

router.post('/posts', postController.createPost);

module.exports = router;
