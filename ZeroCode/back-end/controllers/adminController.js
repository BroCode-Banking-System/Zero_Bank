const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const AdminUsers = require("../models/adminModel");

async function hashPasswordIfNeeded(data) {
  const updatedData = { ...data };

  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    updatedData.password = await bcrypt.hash(data.password, salt);
  }

  return updatedData;
}

// ==============================
// 📊 Dashboard Statistics
// ==============================
exports.getDashboardStats = async (req, res) => {
  try {
    // Total customers
    const totalCustomers = await User.countDocuments();

    // Total employees
    const totalEmployees = await Employee.countDocuments();

    // Active accounts
    const activeAccounts = await Account.countDocuments({ status: "active" });

    // Pending approvals
    const pendingApprovals = await Account.countDocuments({ status: "pending" });

    // Transactions today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const transactionsToday = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: today, $lt: tomorrow },
          status: "completed",
        },
      },
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]);

    const totalAmountToday =
      transactionsToday.length > 0 ? transactionsToday[0].totalAmount : 0;

    res.json({
      totalCustomers,
      totalEmployees,
      activeAccounts,
      transactionsToday: totalAmountToday,
      pendingApprovals,
    });
  } catch (err) {
    console.error("Error in getDashboardStats:", err);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};

// ==============================
// 🏦 Account Management
// ==============================

// ✅ Fetch all accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    console.error("Error fetching accounts:", err);
    res.status(500).json({ message: "Server error while fetching accounts" });
  }
};


// Approve account + auto create customer
exports.approveAccount = async (req, res) => {
  try {
    // Update account status
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { status: "active" },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check if a user already exists with the same email
    const existingUser = await User.findOne({ email: account.email });
    if (existingUser) {
      return res.status(200).json({
        message: "Account approved. User already exists.",
        account,
        user: existingUser,
      });
    }

    // Create username from fullName
    const username =
      (account.fullName || "user").replace(/\s+/g, "").toLowerCase();

    // Build new user data
    const newUserData = {
      username: username,
      email: account.email,
      password: account.password || "123456", // fallback if no password
    };

    // Hash password
    const hashedData = await hashPasswordIfNeeded(newUserData);

    // Save new user
    const newUser = new User(hashedData);
    await newUser.save();

    res.status(200).json({
      message: "Account approved & User created successfully!",
      account,
      user: newUser,
    });
  } catch (err) {
    console.error("Error approving account:", err);
    res.status(500).json({ message: "Error approving account" });
  }
};


// Freeze account
exports.freezeAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { status: "closed" },
      { new: true }
    );
    if (!account)
      return res.status(404).json({ message: "Account not found" });

    res.status(200).json(account);
  } catch (err) {
    console.error("Error freezing account:", err);
    res.status(500).json({ message: "Error freezing account" });
  }
};



// ========== USER CONTROLLERS ==========

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const data = await hashPasswordIfNeeded(req.body);
    const newUser = new User(data);
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updateData = await hashPasswordIfNeeded(req.body);
    await User.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ==============================
// 🔐 Admin Password Management
// ==============================

exports.changeAdminPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // 1️⃣ Check if admin exists
    const admin = await AdminUsers.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 2️⃣ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Update admin password
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Server error while updating password" });
  }
};