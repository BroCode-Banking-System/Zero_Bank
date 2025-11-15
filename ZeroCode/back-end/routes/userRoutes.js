const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/userController");

// GET dashboard data for a user
router.get("/dashboard/:id", getDashboardData);
//router.put("/update-finance/:id", updateFinance);


module.exports = router;
