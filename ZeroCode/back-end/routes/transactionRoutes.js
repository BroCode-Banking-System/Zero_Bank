// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { transferFunds, getRecentTransactions, getDeposits, getWithdrawals } = require("../controllers/transactionController");

router.post("/transfer", transferFunds);
router.get("/recent/:userId", getRecentTransactions);

// Deposit History
router.get("/deposits/:userId", getDeposits);
// Withdrawal History
router.get("/withdrawals/:userId", getWithdrawals);

module.exports = router;