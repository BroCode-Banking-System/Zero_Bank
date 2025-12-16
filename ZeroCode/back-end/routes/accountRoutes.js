const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const {
  createAccount,
  getAllAccounts,
  getPendingAccounts,
  approveAccount,
  freezeAccount,
  getAccountByAccNo,      // ADD NEW CONTROLLER FUNCTION
} = require("../controllers/accountController");

// File storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post(
  "/accounts",
  upload.fields([
    { name: "aadhaardoc", maxCount: 1 },
    { name: "pandoc", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  createAccount
);

// Admin routes
router.get("/admin/accounts", getAllAccounts);
router.get("/admin/accounts/pending", getPendingAccounts);
router.post("/admin/accounts/:id/approve", approveAccount);
router.post("/admin/accounts/:id/freeze", freezeAccount);

// NEW ROUTE – Fetch account details by Account Number
router.get("/accounts/:accNo", getAccountByAccNo);

module.exports = router;
