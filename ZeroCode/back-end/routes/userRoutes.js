// back-end/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUserDashboard } = require("../controllers/userController");

// GET dashboard data for a user
router.get("/dashboard/:senderId", getUserDashboard);

module.exports = router;
