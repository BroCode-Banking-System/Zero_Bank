// routes/manageUser.js
const express = require("express");
const router = express.Router();
const manageUserController = require("../controllers/manageUserController");

// ===== USER ROUTES =====
router.get("/users", manageUserController.getUsers);
router.post("/users", manageUserController.createUser);
router.put("/users/:id", manageUserController.updateUser);
router.delete("/users/:id", manageUserController.deleteUser);

// ===== EMPLOYEE ROUTES =====
router.get("/employees", manageUserController.getEmployees);
router.post("/employees", manageUserController.createEmployee);
router.put("/employees/:id", manageUserController.updateEmployee);
router.delete("/employees/:id", manageUserController.deleteEmployee);

module.exports = router;
