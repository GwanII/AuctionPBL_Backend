const express = require("express");
const router = express.Router();
const chattingController = require("../controllers/chattingController");

// 채팅방 생성
router.post("/", chattingController.createChatRoom);

// 사용자 채팅방 목록 조회 (unreadCount 포함 + 정렬)
router.get("/user/:userId", chattingController.getChatRoomsByUser);

// 채팅방 정보 조회
router.get("/:roomId", chattingController.getChatRoom);

// 채팅방 메시지 전체 조회
router.get("/:roomId/messages", chattingController.getMessagesByRoom);

// 메시지 추가
router.post("/:roomId/message", chattingController.addMessage);

// 메시지 읽음 처리
router.post("/:roomId/read", chattingController.markMessagesAsRead);

// ✅ 채팅방 상단 고정/해제
router.patch("/:roomId/pin", chattingController.togglePinChatRoom);

// 채팅방 삭제
router.delete("/:roomId", chattingController.deleteChatRoom);

module.exports = router;
