export default function Profile() {
  return (
    <div>
      <h2>Customer Profile</h2>
      <p>View and update your personal information.</p>

      <ul className="list-group">
        <li className="list-group-item"><strong>Name:</strong> John Doe</li>
        <li className="list-group-item"><strong>Email:</strong> john@example.com</li>
        <li className="list-group-item"><strong>Phone:</strong> +91 9876543210</li>
        <li className="list-group-item"><strong>Address:</strong> Kolkata, India</li>
      </ul>
    </div>
  );
}
