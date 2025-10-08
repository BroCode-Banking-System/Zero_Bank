// back-end/controllers/authController.js
const bcrypt = require("bcryptjs");
const AdminUser = require("../models/adminModel");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  const { role, username, password } = req.body;

  try {
    let userDoc;

    // Select collection based on role
    if (role === "admin") {
      userDoc = await AdminUser.findOne({ username });
    } else if (role === "user") {
      userDoc = await User.findOne({ username });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // If no user found
    if (!userDoc) {
      return res.status(404).json({ message: `${role} not found` });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success response
    res.status(200).json({
      message: `${role} login successful`,
      redirectUrl: role === "admin" ? "/admin/dashboard" : "/user/dashboard",
      user: {
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
        role: userDoc.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
