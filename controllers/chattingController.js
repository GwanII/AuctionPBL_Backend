const ChattingRoom = require("../models/chattingRoom");
const ChattingMessage = require("../models/chattingMessage");

// 1. 채팅방 생성 + 첫 메시지 저장
exports.createChatRoom = async (req, res) => {
  try {
    const { senderId, message, user1Id, user2Id } = req.body;

    const newRoom = await ChattingRoom.create({ user1Id, user2Id });
    const newMessage = await ChattingMessage.create({
      roomId: newRoom._id,
      senderId,
      message,
      readBy: [senderId]    // 보낸 사람은 자동으로 읽음 처리
    });

    newRoom.lastMessageId = newMessage._id;
    await newRoom.save();

    res.status(201).json({ room: newRoom, firstMessage: newMessage });
  } catch (err) {
    res.status(500).json({ error: "채팅방 생성 실패", details: err.message });
  }
};

// 2. 채팅방 정보 조회 (참여자 + 마지막 메시지)
exports.getChatRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChattingRoom.findById(roomId).populate("lastMessageId");
    if (!room) {
      return res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: "채팅방 조회 실패", details: err.message });
  }
};

// 3. 채팅방 모든 메시지 조회
exports.getMessagesByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await ChattingMessage.find({ roomId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "메시지 조회 실패", details: err.message });
  }
};

// 4. 메시지 추가
exports.addMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { senderId, message } = req.body;

    const newMessage = await ChattingMessage.create({
      roomId,
      senderId,
      message,
      readBy: [senderId]   // 보낸 사람은 읽음 처리
    });

    await ChattingRoom.findByIdAndUpdate(
      roomId,
      { lastMessageId: newMessage._id }
    );

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "메시지 저장 실패", details: err.message });
  }
};

// 메시지 읽음 처리 (readBy 배열에 userId 추가)
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId } = req.body;

    await ChattingMessage.updateMany(
      { roomId, readBy: { $ne: userId } },  // readBy != userId 일 때 
      { $push: { readBy: userId } }         // readBy에 추가
    );

    res.status(200).json({ message: "읽음 처리 완료" });
  } catch (err) {
    res.status(500).json({ error: "읽음 처리 실패", details: err.message });
  }
};

// 채팅방 삭제 (메시지 포함)
exports.deleteChatRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    await ChattingMessage.deleteMany({ roomId });
    await ChattingRoom.findByIdAndDelete(roomId);
    res.status(200).json({ message: "채팅방 삭제 완료" });
  } catch (err) {
    res.status(500).json({ error: "삭제 실패", details: err.message });
  }
};

// 사용자별 채팅방 목록 조회 + 안 읽은 메시지 개수(unreadCount) 포함 + 상단 고정 고려
exports.getChatRoomsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let rooms = await ChattingRoom.find({
      $or: [{ user1Id: userId }, { user2Id: userId }]
    }).populate("lastMessageId");

    rooms = rooms.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      const timeA = a.lastMessageId?.createdAt || new Date(0);
      const timeB = b.lastMessageId?.createdAt || new Date(0);
      return timeB - timeA;
    });

    const roomsWithUnread = await Promise.all(
      rooms.map(async (room) => {
        const unreadCount = await ChattingMessage.countDocuments({
          roomId: room._id,
          readBy: { $ne: userId }
        });
        return {
          ...room.toObject(),
          unreadCount
        };
      })
    );

    res.status(200).json(roomsWithUnread);
  } catch (err) {
    res.status(500).json({ error: "채팅방 목록 조회 실패", details: err.message });
  }
};

// ✅ 상단 고정 기능 추가
exports.togglePinChatRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChattingRoom.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
    }

    room.isPinned = !room.isPinned;
    await room.save();

    res.status(200).json({ message: room.isPinned ? "상단 고정됨" : "고정 해제됨" });
  } catch (err) {
    res.status(500).json({ error: "고정 처리 실패", details: err.message });
  }
};