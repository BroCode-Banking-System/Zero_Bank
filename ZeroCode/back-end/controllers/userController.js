// back-end/controllers/userController.js
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");


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
          createdAt: { $gte: startOfMonth  },
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
          createdAt: { $gte: today },
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


/* ===========================
   GET USER PROFILE
=========================== */
exports.getProfile = async (req, res) => {
  try {
    const user = await Account.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===========================
   MULTER CONFIG
=========================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({ storage });

/* ===========================
   UPDATE PROFILE IMAGE
=========================== */
exports.updateProfileImage = async (req, res) => {
  try {
    const imagePath = `/uploads/${req.file.filename}`;

    await Account.findByIdAndUpdate(req.params.userId, {
      photo: imagePath,
    });

    res.json({
      message: "Profile image updated",
      photo: imagePath,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔹 Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // 🔹 Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
