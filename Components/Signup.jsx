import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Api/firebase";
// import "../src/Styles/signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {

     setUser(e.target.value,{ ...user });
    // setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.name || !user.email || !user.password || !user.contact) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      toast.success("Signup Successful!", { position: "top-center" });
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Signup</h2>
        {error && <p className="signup-error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            className="signup-name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="signup-email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="signup-password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            className="signup-contact"
            placeholder="Enter your contact number"
            value={user.contact}
            onChange={handleChange}
          />
          <button className="signup-button" type="submit">Signup</button>
        </form>
        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
