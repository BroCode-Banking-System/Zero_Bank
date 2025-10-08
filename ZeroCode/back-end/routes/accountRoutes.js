// backend/routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/accountController");
const multer = require("multer");
const path = require("path");

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "aadhaardoc") cb(null, "uploads/aadhaar");
    else if (file.fieldname === "pandoc") cb(null, "uploads/pan");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "aadhaardoc", maxCount: 1 },
    { name: "pandoc", maxCount: 1 },
  ]),
  createAccount
);

module.exports = router;
