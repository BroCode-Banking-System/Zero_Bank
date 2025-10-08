const Account = require("../models/account");

const createAccount = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const { body, files } = req;

    const newAccount = new Account({
      ...body,
      aadhaardoc: files?.aadhaardoc ? files.aadhaardoc[0].path : null,
      pandoc: files?.pandoc ? files.pandoc[0].path : null,
    });

    await newAccount.save();
    console.log("Account saved successfully");
    res.status(201).json({ success: true, message: "Account created", data: newAccount });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createAccount };
