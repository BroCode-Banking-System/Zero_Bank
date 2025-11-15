// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { transferFunds } = require("../controllers/transactionController");

router.post("/transfer", transferFunds);

module.exports = router;
