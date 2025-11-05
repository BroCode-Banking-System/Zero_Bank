// controllers/manageUserController.js
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Employee = require("../models/employeeModel");

// Helper function to hash password if provided
async function hashPasswordIfNeeded(data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return data;
}

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

// ========== EMPLOYEE CONTROLLERS ==========

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const data = await hashPasswordIfNeeded(req.body);
    const newEmployee = new Employee(data);
    await newEmployee.save();
    res.json({ message: "Employee created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const updateData = await hashPasswordIfNeeded(req.body);
    await Employee.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
