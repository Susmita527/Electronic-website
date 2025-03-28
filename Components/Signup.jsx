import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Api/firebase";
// import "../src/Styles/signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {GoogleMap,useJsApiLoader,StandaloneSearchBox} from '@react-google-maps/api'


const LOCATIONIQ_API_KEY = "pk.b93393bec29c2cbf42f13d70ba0efeae"; 

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === "address") {
      fetchAddressSuggestions(e.target.value);
    }
  };

  const fetchAddressSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_API_KEY}&q=${query}&limit=5`
      );
      const data = await response.json();
      if (data ) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  // Select Address from Suggestions
  const handleSelectAddress = (address) => {
    setUser({ ...user, address });
    setSuggestions([]);
  };

 
  const handleSignup = async (e) => {
    
    e.preventDefault();
    setError("");
  
    if (!user.name || !user.email || !user.password || !user.contact || !user.address) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

      const newUser = {
        name: user.name,
        email: user.email,
        contact: user.contact,
        address: user.address,
        uid: userCredential.user.uid, 
      };
  
        const existingUsers = JSON.parse(localStorage.getItem("userdetails")) || [];
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("userdetails", JSON.stringify(updatedUsers));
        toast.success("Signup Successful!", { position: "top-center" });
        setTimeout(() => navigate("/login"), 1000);
    }   catch (error) {
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

          <div className="autocomplete-container">
            <input
              type="text"
              name="address"
              className="signup-contact"
              placeholder="Enter your Address"
              value={user.address}
              onChange={handleChange}
            />
            {/* Display Address Suggestions */}
            {suggestions.length > 0 && (
              <ul className="autocomplete-suggestions" style={{ display: user.address ? "block" : "none" }}>
                {suggestions.map((item, index) => (
                  <li key={index} onClick={() => handleSelectAddress(item.display_name)}>
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
