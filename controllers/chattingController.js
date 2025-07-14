const Chat = require('../models/Chat');

// 채팅 메시지 저장
exports.sendMessage = async (req, res) => {
  try {
    const { roomId, sender, message } = req.body;

    const newMessage = new Chat({ roomId, sender, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent', data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 채팅방의 메시지 조회
exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Chat.find({ roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
