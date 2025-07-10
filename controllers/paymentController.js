const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

const getCustomPayments = async (req, res) => {
  try {
    const { cash } = req.query;

    const filter = {};
    if (cash === "true") filter.isCashChange = true;
    else if (cash === "false") filter.isCashChange = false;

    const rawPayments = await Payment.find(filter).populate("buyUserID", "name createdAt");

    console.log("filter:", filter);
    console.log("rawPayments: ",rawPayments );

    const formatted = rawPayments.map((p) => ({
      name: p.buyUserID?.name || "알 수 없음",
      price: p.price,
      paymentMethod: p.paymentMethod,
      createdAt: p.createdAt,
      status: p.isCashChange ? "변환" : "구매"
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ 에러 발생:", err);
    res.status(500).json({ message: "조회 실패", error: err.message || err });
  }
  
};

module.exports = { getCustomPayments };