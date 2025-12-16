import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaPlus, FaTrashAlt, FaEdit, FaSearch } from "react-icons/fa";
import {
  Spinner,
  Table,
  Button,
  Form,
  InputGroup,
  Modal,
  Card,
} from "react-bootstrap";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employeeData, setEmployeeData] = useState({
    username: "",
    email: "",
    password: "",
    role: "employee",
  });

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/employees");
      setEmployees(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to fetch employee list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  // Add or Update employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:8000/api/employees/${selectedEmployee._id}`,
          employeeData
        );
        alert("Employee updated successfully");
      } else {
        await axios.post("http://localhost:8000/api/employees", employeeData);
        alert("Employee added successfully");
      }
      setShowModal(false);
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error("Error saving employee:", err);
      alert("Error saving employee");
    }
  };

  const resetForm = () => {
    setEmployeeData({
      username: "",
      email: "",
      password: "",
      role: "employee",
    });
    setSelectedEmployee(null);
    setIsEdit(false);
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8000/api/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("Error deleting employee");
      }
    }
  };

  // Open modal for editing
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setEmployeeData({
      username: emp.username,
      email: emp.email,
      password: "",
      role: emp.role,
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.username?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.role?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Card className="shadow p-3 rounded-4">
        <Card.Header className="bg-dark text-white rounded-4 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <FaUser className="me-2" /> Employee Management
          </h4>
          <Button
            variant="success"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <FaPlus className="me-2" /> Add Employee
          </Button>
        </Card.Header>

        {/* Search Bar */}
        <div className="d-flex justify-content-end mt-3">
          <InputGroup style={{ maxWidth: "350px" }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, email or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        {/* Employee Table */}
        <Table striped bordered hover responsive className="align-middle mt-3">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.username}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(emp)}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(emp._id)}
                    >
                      <FaTrashAlt /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaUser className="me-2" />{" "}
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={employeeData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Password {isEdit && <small>(Leave blank to keep current)</small>}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={employeeData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={employeeData.role}
                onChange={handleChange}
              >
                <option value="Relationship Manager">Relationship Manager</option>
                <option value="Loan Officer">Loan Officer</option>
                <option value="Customer Service Executive">Customer Service Executive</option>
                <option value="Teller">Teller</option>
                <option value="Clerk">Clerk</option>
                <option value="Peon">Peon</option>
              </Form.Select>
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>{" "}
              <Button variant="primary" type="submit">
                {isEdit ? "Update" : "Add"} Employee
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
