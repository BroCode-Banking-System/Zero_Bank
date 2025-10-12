const bcrypt = require("bcryptjs");
const AdminUser = require("../models/adminModel");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing username, password or role" });
  }

  try {
    let userDoc;

    if (role === "admin") {
      userDoc = await AdminUser.findOne({ username });
    } else if (role === "user") {
      userDoc = await User.findOne({ username });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    if (!userDoc) {
      return res.status(404).json({ message: `${role} not found` });
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: `${role} login successful`,
      redirectUrl: role === "admin" ? "/adminDashboard" : "/",
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
