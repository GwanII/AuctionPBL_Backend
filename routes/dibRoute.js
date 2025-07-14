const express = require("express");
const router = express.Router();
const { toggleDib } = require("../controllers/dibController");

// POST /api/dibs
router.post("/dibs", toggleDib);

module.exports = router;
