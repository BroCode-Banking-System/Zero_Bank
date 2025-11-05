// back-end/models/transactionModel.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ["deposit", "withdrawal", "transfer"], required: true },
    status: { type: String, enum: ["completed", "pending", "failed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema, "transactions");
