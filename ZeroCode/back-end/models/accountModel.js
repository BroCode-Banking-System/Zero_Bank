const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    aadhaar: { type: String, required: true },
    aadhaardoc: { type: String },
    pan: { type: String, required: true },
    pandoc: { type: String },
    accountType: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    branch: { type: String },
    language: { type: String },
    consent: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "active", "closed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema, "accounts");
