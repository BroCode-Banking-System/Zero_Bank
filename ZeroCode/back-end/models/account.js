// backend/models/Account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  aadhaar: { type: String, required: true },
  aadhaardoc: { type: String },
  pan: { type: String, required: true },
  pandoc: { type: String },
  accountType: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  branch: { type: String, required: true },
  language: { type: String, required: true },
  consent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("account", accountSchema);
