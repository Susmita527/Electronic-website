import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 import "../src/Styles/order.css"; 

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    const userOrders = allOrders[user.uid] || [];
    setOrders(userOrders);
  }, []);

  return (
    <div className="order-details-page">
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Date: {new Date(order.date_created).toLocaleString()}</p>
            <ul>
              {order.line_items.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong>  {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrder;
