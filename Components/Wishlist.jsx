import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../src/Styles/wishlist.css"; 
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleDetails = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  return (
      <div className="product-page">
      <h2 style={{ textAlign: "center", color: "white" }}>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="loading-text">Your wishlist is empty.</p>
      ) : (
        <div className="product-container">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleDetails(product.id)}
            >
              <button
                className="wishlist-btnn remove-wishlist"
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeFromWishlist(product.id);
                }}
              >
                <FaTrash />
              </button>
              <img
                src={product.images?.[0]?.src || "placeholder.jpg"}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button className="add-to-cart">Add to cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
