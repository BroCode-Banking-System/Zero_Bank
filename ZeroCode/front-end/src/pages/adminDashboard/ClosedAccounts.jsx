import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, InputGroup, Form } from "react-bootstrap";
import { FaUserSlash, FaSearch } from "react-icons/fa";

export default function ClosedAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClosedAccounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/admin/accounts");
      const frozen = res.data.filter((acc) => acc.status === "frozen");
      setAccounts(frozen);
    } catch (err) {
      console.error("Error fetching closed accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosedAccounts();
  }, []);

  const filteredAccounts = accounts.filter((acc) => {
    const term = searchTerm.toLowerCase();
    return (
      acc.fullName?.toLowerCase().includes(term) ||
      acc.email?.toLowerCase().includes(term) ||
      acc.mobile?.includes(term)
    );
  });

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /> Loading...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">
        <FaUserSlash className="me-2" /> Admin — Closed / Frozen Accounts
      </h3>

      <div className="d-flex justify-content-end mb-3">
        <InputGroup style={{ maxWidth: "350px" }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-danger text-center">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Account Type</th>
            <th>Frozen On</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((acc, i) => (
            <tr key={acc._id}>
              <td className="text-center">{i + 1}</td>
              <td className="text-center">{acc.fullName}</td>
              <td className="text-center">{acc.email}</td>
              <td className="text-center">{acc.mobile}</td>
              <td className="text-center">{acc.accountType}</td>
              <td className="text-center">{new Date(acc.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredAccounts.length === 0 && (
        <p className="text-center text-muted mt-3">No closed accounts found</p>
      )}
    </div>
  );
}
