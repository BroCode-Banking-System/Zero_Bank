const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Employee CRUD
router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);

// Task management routes — must come BEFORE ":id"
router.get("/tasks", employeeController.getAllTasks);
router.patch("/tasks/:id", employeeController.updateTaskStatus);

// Branch summary
router.get("/branch-summary", employeeController.getBranchSummary);

// Dynamic employee routes (must be last)
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
