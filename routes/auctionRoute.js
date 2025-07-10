const express = require("express");
const router = express.Router();

const { createAuctionMessage } = require("../controllers/auctionController");

router.post("/createAuctionMessage", createAuctionMessage);  // POST /api/auction/createAuctionMessage

module.exports = router;