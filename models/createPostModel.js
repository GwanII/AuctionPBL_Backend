const mongoose = require('mongoose');

const createPostSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  images: [String],
  seller: {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userImage: String,
  },
  minimumPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('posts', createPostSchema);
