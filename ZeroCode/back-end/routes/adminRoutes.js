const express = require("express");
const {
  getAllAccounts,
  approveAccount,
  freezeAccount,
  getDashboardStats,
  changeAdminPassword,
} = require("../controllers/adminController");

const router = express.Router();

// Routes
router.get("/accounts", getAllAccounts);
router.post("/accounts/:id/approve", approveAccount);
router.post("/accounts/:id/freeze", freezeAccount);
router.get("/dashboard-stats", getDashboardStats);
router.put("/change-password/:id", changeAdminPassword);

module.exports = router;
