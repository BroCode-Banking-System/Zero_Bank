// routes/statementRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { downloadStatement } = require("../controllers/statementController");

router.get("/statement/download", protect, downloadStatement);

module.exports = router;
