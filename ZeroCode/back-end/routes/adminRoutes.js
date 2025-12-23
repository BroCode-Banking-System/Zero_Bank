const express = require("express");
const {
  getAllAccounts,
  getAllTransactions,
  approveAccount,
  freezeAccount,
  getDashboardStats,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/adminController");

const router = express.Router();

// ==============================
// Admin account management
// ==============================
router.get("/accounts", getAllAccounts);
router.get("/admin/transactions", getAllTransactions);
router.post("/accounts/:id/approve", approveAccount);
router.post("/accounts/:id/freeze", freezeAccount);
router.get("/dashboard-stats", getDashboardStats);

// ==============================
// User management routes
// ==============================
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
