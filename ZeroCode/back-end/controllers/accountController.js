const Account = require("../models/accountModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

/**
 * Generate a unique 12-digit account number
 */
const generateAccountNumber = async () => {
  let accNo;
  let exists = true;

  while (exists) {
    accNo = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    exists = await Account.findOne({ accNo });
  }

  return accNo;
};

/**
 * @desc Create a new account
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
      password,
      language,
      consent,
    } = req.body;

    const aadhaardoc = req.files?.aadhaardoc?.[0]?.filename || null;
    const pandoc = req.files?.pandoc?.[0]?.filename || null;
    const signature = req.files?.signature?.[0]?.filename || null;
    const photo = req.files?.photo?.[0]?.filename || null;

    const accNo = await generateAccountNumber();
    const hashedPassword = await bcrypt.hash(password, 10);

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
      signature,
      photo,
      language,
      consent: consent === "true",
      status: "pending",
      accNo,
      password: hashedPassword,
    });

    await newAccount.save();

    res.status(201).json({
      message: "Account created successfully",
      accNo,
    });
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
    const accounts = await Account.find({
      status: { $in: ["pending", "active", "frozen"] },
    }).sort({ createdAt: -1 });

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
    const pending = await Account.find({ status: "pending" }).sort({
      createdAt: -1,
    });

    res.status(200).json(pending);
  } catch (error) {
    console.error("Error fetching pending accounts:", error);
    res.status(500).json({ message: "Failed to fetch pending accounts" });
  }
};

/**
 * @desc Approve account
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
 * @desc Freeze (reject) account
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

/**
 * NEW: Fetch account details by Account Number
 * @route GET /api/accounts/:accNo
 */
// 

const getAccountByAccNo = async (req, res) => {
  try {
    const accNo = req.params.accNo.trim();

    // Match string or number
    const account = await Account.findOne({
      $or: [
        { accNo: accNo },
        { accNo: Number(accNo) },
      ],
    });

    // Case 1: Account not found
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not exists",
      });
    }

    // Case 2: Account found but not active
    if (account.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Account is not active",
      });
    }

    // Case 3: Active account → send full name
    return res.json({
      success: true,
      account: {
        name: account.fullName,
        accNo: account.accNo,
        // ifsc: account.ifscCode,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  createAccount,
  getAllAccounts,
  getPendingAccounts,
  approveAccount,
  freezeAccount,
  getAccountByAccNo, 
};
