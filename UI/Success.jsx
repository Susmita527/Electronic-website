import React from "react";
import { useNavigate } from "react-router-dom";


const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h2>Payment Successful! 🎉</h2>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      
      <button className="continue-shopping-btn" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;
