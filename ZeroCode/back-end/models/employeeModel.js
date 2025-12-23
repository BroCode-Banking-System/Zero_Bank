const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "employee" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema, "employees");