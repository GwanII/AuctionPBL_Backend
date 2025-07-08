const express = require("express");
const router = express.Router(); 

const { getCustomPayments } = require("../controllers/paymentController");

router.get("/", getCustomPayments);

module.exports = router;