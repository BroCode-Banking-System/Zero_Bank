//const { Minimize } = require("lucide-react");
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true, maxlength: 10, minlength: 10 },
    accNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadhaar: { type: String, required: true, unique: true, maxlength: 12, minlength: 12 },
    aadhaardoc: { type: String },
    pan: { type: String, required: true, unique: true, maxlength: 10, minlength: 10 },
    pandoc: { type: String },
    accountType: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    signature: { type: String },
    photo: { type: String },
    language: { type: String },
    consent: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "active", "closed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema, "accounts");
