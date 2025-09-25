const mongoose = require("mongoose");

const chattingMessageSchema = new mongoose.Schema({
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ChattingRoom", 
    required: true 
  },
  senderId: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  // ++ 메세지 모델에 메세지 읽은 사용자 ID 목록을 추가함(채팅방 입장 OR 읽음 버튼 누르면 추가)
  readBy: [{ type: String }]  
});

module.exports = mongoose.model(
  "ChattingMessage",
  chattingMessageSchema,
  "chattingMessages"
);
