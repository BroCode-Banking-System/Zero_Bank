// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { transferFunds, getRecentTransactions } = require("../controllers/transactionController");

router.post("/transfer", transferFunds);
router.get("/recent/:userId", getRecentTransactions);

module.exports = router;
