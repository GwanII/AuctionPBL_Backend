const mongoose = require("mongoose");

const chattingRoomSchema = new mongoose.Schema({
  lastMessageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ChattingMessage" 
},
  user1Id: { 
    type: String, 
    required: true },
  user2Id: { 
    type: String, 
    required: true 
},
  isPinned: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now },
});

module.exports = mongoose.model("ChattingRoom", chattingRoomSchema, "chattingRooms");
