const Account = require("../models/accountModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const PDFDocument = require("pdfkit");
const Transaction = require("../models/transactionModel");

const generateAccountNumber = async () => {
  let accNo;
  let exists = true;

  while (exists) {
    accNo = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    exists = await Account.findOne({ accNo });
  }

  return accNo;
};

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
      gender,
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
      gender,
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

const getAccountByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const account = await Account.findOne({ email });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.status !== "active") {
      return res.status(403).json({ message: "Account not active" });
    }

    res.json(account); // send FULL account
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const downloadStatement = async (req, res) => {
  try {
    const { accNo } = req.params;

    // Fetch account
    const account = await Account.findOne({ accNo });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Fetch SUCCESS transactions related to this account
    const transactions = await Transaction.find({
      status: "Success",
      $or: [
        { recipientAccount: accNo },     // Credit
        { senderId: account._id.toString() } // Debit
      ]
    }).sort({ createdAt: -1 });

    // Create PDF
    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=statement-${accNo}.pdf`
    );

    doc.pipe(res);

    // ===== HEADER =====
    doc.fontSize(18).text("ZeroBank Account Statement", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Account Holder: ${account.fullName}`);
    doc.text(`Account Number: ${account.accNo}`);
    doc.text(`Email: ${account.email}`);
    doc.text(`Current Balance: ₹${account.balance}`);
    doc.moveDown();

    // ===== TABLE HEADER =====
    doc.font("Helvetica-Bold");
    doc.text("Date                              Type         Amount          Description");
    doc.moveDown(0.5);
    doc.font("Helvetica");

    // ===== TRANSACTIONS =====
    transactions.forEach(tx => {
      doc.text(
        `${tx.createdAt.toDateString()}         ${tx.type.padEnd(6)}        ₹${tx.amount}                 ${tx.description || "-"}`
      );
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate statement" });
  }
};

const getAccountByAccNo = async (req, res) => {
  try {
    const account = await Account.findOne({
      accNo: req.params.accNo,
      status: "active",
    }).select("fullName accNo");

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ account });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getPendingAccounts,
  approveAccount,
  freezeAccount,
  getAccountByEmail,
  downloadStatement,
  getAccountByAccNo
};
