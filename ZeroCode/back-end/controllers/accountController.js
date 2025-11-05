// controllers/accountController.js
const Account = require("../models/accountModel");

/**
 * @desc Create a new account (with documents)
 * @route POST /api/accounts
 */
const createAccount = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      aadhaar,
      pan,
      accountType,
      state,
      city,
      branch,
      language,
      consent,
    } = req.body;

    const aadhaardoc = req.files?.aadhaardoc?.[0]?.filename || null;
    const pandoc = req.files?.pandoc?.[0]?.filename || null;

    const newAccount = new Account({
      fullName,
      email,
      mobile,
      aadhaar,
      aadhaardoc,
      pan,
      pandoc,
      accountType,
      state,
      city,
      branch,
      language,
      consent: consent === "true",
      status: "pending",
    });

    await newAccount.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Account creation failed:", err);
    res.status(500).json({ message: "Server error creating account" });
  }
};

/**
 * @desc Get all accounts
 * @route GET /api/admin/accounts
 */
const getAllAccounts = async (req, res) => {
  try {
    const validStatuses = ["pending", "active", "frozen"];
    const accounts = await Account.find({ status: { $in: validStatuses } }).sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
};


/**
 * @desc Get pending accounts
 * @route GET /api/admin/accounts/pending
 */
const getPendingAccounts = async (req, res) => {
  try {
    const pending = await Account.find({ status: "pending" }).sort({ createdAt: -1 });
    res.status(200).json(pending);
  } catch (error) {
    console.error("Error fetching pending accounts:", error);
    res.status(500).json({ message: "Failed to fetch pending accounts" });
  }
};

/**
 * @desc Approve an account
 * @route POST /api/admin/accounts/:id/approve
 */
const approveAccount = async (req, res) => {
  try {
    const acc = await Account.findById(req.params.id);
    if (!acc) return res.status(404).json({ message: "Account not found" });

    acc.status = "active";
    await acc.save();

    res.status(200).json({ message: "Account approved successfully" });
  } catch (error) {
    console.error("Error approving account:", error);
    res.status(500).json({ message: "Failed to approve account" });
  }
};

/**
 * @desc Freeze (reject) an account
 * @route POST /api/admin/accounts/:id/freeze
 */
const freezeAccount = async (req, res) => {
  try {
    const acc = await Account.findById(req.params.id);
    if (!acc) return res.status(404).json({ message: "Account not found" });

    acc.status = "frozen";
    await acc.save();

    res.status(200).json({ message: "Account frozen successfully" });
  } catch (error) {
    console.error("Error freezing account:", error);
    res.status(500).json({ message: "Failed to freeze account" });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getPendingAccounts,
  approveAccount,
  freezeAccount,
};
