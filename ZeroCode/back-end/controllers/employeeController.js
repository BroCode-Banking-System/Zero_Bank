//back-end/controllers/employeeController.js
const Employee = require("../models/employeeModel");
const Customer = require("../models/userModel");
const Account = require("../models/accountModel");
const bcrypt = require("bcryptjs");
const Loan = require("../models/loanModel");
const Task = require("../models/taskModel");

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await Employee.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ message: "Error adding employee" });
  }
};

// Update employee (NEW)
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    employee.username = username || employee.username;
    employee.email = email || employee.email;
    employee.role = role || employee.role;

    if (password) {
      employee.password = await bcrypt.hash(password, 10);
    }

    await employee.save();
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: "Failed to update employee" });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};

// Get single employee
exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(emp);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ message: "Error fetching employee details" });
  }
};

// Get branch summary
exports.getBranchSummary = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const totalCustomers = await Customer.countDocuments();
    const accountsOpenedToday = await Account.countDocuments({
      createdAt: { $gte: todayStart },
    });
    const loansProcessedToday = await Loan.countDocuments();

    // // Calculate total deposits today
    // const deposits = await Deposit.aggregate([
    //   { $match: { createdAt: { $gte: todayStart } } },
    //   { $group: { _id: null, total: { $sum: "$amount" } } },
    // ]);

    // const depositsToday = deposits.length > 0 ? deposits[0].total : 0;

    res.status(200).json({
      totalCustomers,
      accountsOpenedToday,
      loansProcessedToday,
      //depositsToday,
    });
  } catch (err) {
    console.error("Error fetching branch summary:", err);
    res.status(500).json({ message: "Failed to fetch branch summary" });
  }
};


// GET /api/employees/tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
};

// PATCH /api/employees/tasks/:id
exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status update" });
  }

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();

    res.json({ message: `Task ${status.toLowerCase()} successfully`, task });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error updating task" });
  }
};