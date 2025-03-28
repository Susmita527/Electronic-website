import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Api/firebase";
import "../src/Styles/login.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      
      // Fetch all users from LocalStorage
      const allUsers = JSON.parse(localStorage.getItem("userdetails")) || [];

      // Find the user details matching the logged-in email
      const loggedInUser = allUsers.find((user) => user.email === loginData.email);

      if (loggedInUser) {
        // Store only the logged-in user's details separately
        localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      }

      toast.success("Login Successful!", { position: "top-center" });
      setTimeout(() => navigate("/"), 1000);

    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            className="login-email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="login-password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button className="login-button" type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <span className="signup-text" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
