// Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaAddressCard,
  FaUniversity,
  FaLanguage,
  FaEdit
} from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import defaultProfile from "../../assets/img/profile.png";

export default function Profile() {
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* ===============================
     FETCH PROFILE
  =============================== */
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8000/api/users/${userId}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  /* ===============================
     IMAGE UPLOAD
  =============================== */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      await axios.put(
        `http://localhost:8000/api/users/profile-image/${userId}`,
        formData
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!profile) {
    return <p className="text-center mt-5">Loading profile...</p>;
  }

  const profileDetails = [
    { icon: <FaUser />, label: "Full Name", value: profile.fullName },
    { icon: <FaEnvelope />, label: "Email", value: profile.email },
    { icon: <FaPhone />, label: "Mobile", value: profile.mobile },
    { icon: <FaIdCard />, label: "Aadhaar", value: profile.aadhaar },
    { icon: <FaIdCard />, label: "PAN", value: profile.pan },
    {
      icon: <FaUniversity />,
      label: "Account Type",
      value: profile.accountType
    },
    {
      icon: <FaAddressCard />,
      label: "Address",
      value: `${profile.city || ""}, ${profile.state || ""}`
    },
    {
      icon: <FaLanguage />,
      label: "Language",
      value: profile.language || "Not set"
    }
  ];

  return (
    <div className="container mt-5 py-5">
      <Card className="shadow-lg p-4 position-relative">

        {/* PROFILE IMAGE */}
        <div className="position-absolute" style={{ top: "-50px", right: "30px" }}>
          <img
            src={
              profile?.photo && profile.photo.trim() !== ""
                ? `http://localhost:8000${profile.photo}`
                : defaultProfile
            }
            alt="Profile"
            className="rounded-circle border shadow"
            style={{
              width: "110px",
              height: "110px",
              objectFit: "cover",
              background: "#fff"
            }}
          />

        </div>

        {/* IMAGE UPLOAD */}
        <div className="text-end mt-5">
          <label className="btn btn-sm btn-outline-primary">
            {uploading ? "Uploading..." : <><FaEdit /> Change Photo</>}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <h3 className="mb-4">Customer Profile</h3>

        <div className="row g-3">
          {profileDetails.map((item, idx) => (
            <div key={idx} className="col-md-6">
              <div className="d-flex align-items-center p-3 border rounded shadow-sm">
                <div className="me-3 p-3 rounded-circle bg-light">
                  {item.icon}
                </div>
                <div>
                  <div className="text-muted small">{item.label}</div>
                  <div className="fw-bold">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Button variant="primary" href="/userDashboard/settings">
            Change Password & Security
          </Button>
        </div>
      </Card>
    </div>
  );
}
