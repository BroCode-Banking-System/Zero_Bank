const express = require("express");
const router = express.Router();

const requireRole = require("../middleware/roleMiddleware");
const { listUsers, setKycStatus } = require("../controllers/adminController");
router.use(auth, requireRole("admin"));
router.get("/users", listUsers);
router.post("/kyc", setKycStatus);

module.exports = router;