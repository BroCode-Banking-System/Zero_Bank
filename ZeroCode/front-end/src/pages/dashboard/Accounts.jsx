import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function Accounts() {
  const accountData = {
    accountNumber: "1234 5678 9012",
    accountType: "Savings Account",
    balance: "₹ 1,25,000.50",
    branch: "Kolkata Main Branch",
    ifsc: "BANK0001234",
    openingDate: "15th Jan 2020",
    status: "Active"
  };

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Header as="h4" className="bg-primary text-white">
          Account Information
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Account Number:</strong> {accountData.accountNumber}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Account Type:</strong> {accountData.accountType}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Balance:</strong> {accountData.balance}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Branch:</strong> {accountData.branch}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>IFSC Code:</strong> {accountData.ifsc}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Opening Date:</strong> {accountData.openingDate}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Status:</strong> {accountData.status}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
