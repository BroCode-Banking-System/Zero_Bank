// models/transactionModel.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipientName: { type: String, required: true },
    recipientAccount: { type: String, required: true },
    ifscCode: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema, "transactions");
