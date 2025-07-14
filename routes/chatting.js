const express = require('express');
const router = express.Router();
const chattingController = require('../controllers/chattingController');

// POST /chatting/send - 메시지 전송
router.post('/send', chattingController.sendMessage);

// GET /chatting/:roomId - 해당 채팅방 메시지 조회
router.get('/:roomId', chattingController.getMessages);

module.exports = router;
