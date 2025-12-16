// back-end/controllers/authController.js
const bcrypt = require("bcryptjs");
const AdminUser = require("../models/adminModel");
const Employee = require("../models/employeeModel");
const User = require("../models/accountModel");

const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing username, password or role" });
  }

  try {
    let userDoc;

    if (role === "admin") {
      userDoc = await AdminUser.findOne({ username });
    } else if (role === "employee") {
      userDoc = await Employee.findOne({ username });
    } else if (role === "user") {
      // ✔ Login using accNo instead of username
      userDoc = await User.findOne({ accNo: username });
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
      redirectUrl:
        role === "admin"
          ? "/adminDashboard"
          : role === "employee"
          ? "/employeeDashboard"
          : "/userDashboard",

      user: {
        id: userDoc._id,
        username: userDoc.username || userDoc.accNo, //  handle accNo
        email: userDoc.email || "",
        fullName: userDoc.fullName || "",
        role: role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
