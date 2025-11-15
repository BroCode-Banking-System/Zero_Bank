import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaBan, FaUser, FaSearch } from "react-icons/fa";
import { Spinner, Table, Button, Form, InputGroup } from "react-bootstrap";

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch only pending account requests
  const fetchPendingAccounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/admin/accounts/pending");
      setAccounts(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching pending accounts:", err);
      setError("Failed to fetch pending accounts");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Approve account
  const approveAccount = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/admin/accounts/${id}/approve`);
      fetchPendingAccounts();
    } catch (err) {
      console.error("Error approving account:", err);
    }
  };

  // 🔹 Freeze account (optional, if you still want to show it)
  const freezeAccount = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/admin/accounts/${id}/freeze`);
      fetchPendingAccounts();
    } catch (err) {
      console.error("Error freezing account:", err);
    }
  };

  useEffect(() => {
    fetchPendingAccounts();
  }, []);

  // 🔹 Apply single search filter (searches across all major fields)
  const filteredAccounts = accounts.filter((acc) => {
    const term = searchTerm.toLowerCase();
    return (
      acc.fullName?.toLowerCase().includes(term) ||
      acc.email?.toLowerCase().includes(term) ||
      acc.mobile?.toString().includes(term) ||
      acc.accountType?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading pending accounts...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">
        <FaUser className="me-2" /> Admin — Pending Account Requests
      </h3>

      {/* 🔹 Single Search Bar */}
      <div className="d-flex justify-content-end mb-3">
        <InputGroup style={{ maxWidth: "350px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by name, email, type, branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th className="text-center">#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Account Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAccounts.map((acc, index) => (
            <tr key={acc._id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{acc.fullName}</td>
              <td className="text-center">{acc.email}</td>
              <td className="text-center">{acc.mobile}</td>
              <td className="text-center">{acc.accountType}</td>
              <td className="text-center">{new Date(acc.createdAt).toLocaleDateString()}</td>
              <td className="text-center">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => approveAccount(acc._id)}
                  className="me-2"
                >
                  <FaCheckCircle /> Approve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => freezeAccount(acc._id)}
                >
                  <FaBan /> Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredAccounts.length === 0 && (
        <p className="text-center text-muted mt-3">No pending requests found</p>
      )}
    </div>
  );
}
