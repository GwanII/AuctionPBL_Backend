const mongoose = require('mongoose');

const createPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [String],
  description: {type: String},
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  auctionPeriod: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }},
  minimumPrice: { type: Number, required: true },
  isAuctionEnded: { type: Boolean, required: true},
  finalWinner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  isSold: {type: Boolean},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('posts', createPostSchema);