const mongoose = require('mongoose');

const dibSchema = new mongoose.Schema({
  postIds: [{
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'posts'},
    createdAt: { type: Date, default: Date.now }}],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}
});

// 유저당 하나의 찜 문서만 존재하도록 인덱스
dibSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('dibs', dibSchema);