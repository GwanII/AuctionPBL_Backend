const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isCashChange: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    required: true
  },
  buyUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

// ✅ 여기 순서 중요
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = mongoose.model("Payment", paymentSchema, "payment");