// back-end/controllers/userController.js
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.params.senderId;

    // Fetch user account with balance and accountType
    const account = await Account.findById(userId).select("balance accountType accNo");
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Monthly spending
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlySpendingAgg = await Transaction.aggregate([
      {
        $match: {
          senderId: userId,
          status: "Success",
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const monthlySpending = monthlySpendingAgg[0]?.total || 0;

    // Today's transactions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAgg = await Transaction.aggregate([
      {
        $match: {
          senderId: userId,
          status: "Success",
          type: "Debit", // ADD THIS
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, totalToday: { $sum: "$amount" } } },
    ]);

    res.json({
      totalBalance: account.balance,
      accountType: account.accountType, // Added accountType here
      accNo: account.accNo, // Added accNo here
      monthlySpending,
      todayTransactions: todayAgg[0]?.totalToday || 0,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};
