const express = require("express");
const {
  getAllAccounts,
  approveAccount,
  freezeAccount,
  getDashboardStats,
  changeAdminPassword,
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
router.post("/accounts/:id/approve", approveAccount);
router.post("/accounts/:id/freeze", freezeAccount);
router.get("/dashboard-stats", getDashboardStats);
router.put("/change-password/:id", changeAdminPassword);

// ==============================
// User management routes
// ==============================
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
