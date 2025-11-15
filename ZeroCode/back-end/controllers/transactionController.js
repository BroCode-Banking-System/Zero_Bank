const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");

/**
 * @desc Transfer funds between accounts (by accNo)
 * @route POST /api/transactions/transfer
 */
const transferFunds = async (req, res) => {
  try {
    const {
      senderAccNo,
      recipientName,
      recipientAccount,
      ifscCode,
      amount,
      description,
    } = req.body;

    // ✅ Validate inputs
    if (!senderAccNo || !recipientAccount || !ifscCode || !amount) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // ✅ Fetch sender account
    const senderAccount = await Account.findOne({ accNo: senderAccNo });
    if (!senderAccount) {
      return res.status(404).json({ message: "Sender account not found" });
    }

    // ✅ Check sufficient balance
    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // ✅ Deduct from sender
    senderAccount.balance -= amount;
    await senderAccount.save();

    // ✅ Try to find recipient (internal transfer)
    const recipientAccountDoc = await Account.findOne({ accNo: recipientAccount });
    if (recipientAccountDoc) {
      recipientAccountDoc.balance += amount;
      await recipientAccountDoc.save();
    }

    // ✅ Create transaction record
    const transaction = new Transaction({
      senderId: senderAccNo, // store accNo as identifier (optional)
      recipientName,
      recipientAccount,
      ifscCode,
      amount,
      description,
      status: "Success",
    });

    await transaction.save();

    res.status(201).json({
      message: "Fund transfer successful",
      transaction,
    });
  } catch (error) {
    console.error("Transfer Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { transferFunds };
