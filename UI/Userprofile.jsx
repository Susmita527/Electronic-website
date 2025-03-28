import React, { useEffect, useState } from "react";
import "../src/Styles/userprofile.css";
import { useNavigate } from "react-router-dom";

function Userprofile() {
  const [user, setUser] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    
    const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>User Profile</h2>
        {user ? (
          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <button className="logout-button" onClick={() => {
              localStorage.removeItem("currentUser");
              navigate("/signup");
            }}>
              Logout
            </button>
          </div>
        ) : (
          <p>No user details found. Please <span className="signup-link" onClick={() => navigate("/signup")}>sign up</span>.</p>
        )}
      </div>
    </div>
  );
}

export default Userprofile;
