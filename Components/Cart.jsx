import React, { useEffect, useState } from "react";
import "../src/Styles/cart.css";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    console.log("Cart Data:", cart); 
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("after cart",cart);
  }, [cart]);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="shopping-cart-page">
      <div className="shopping-cart-container">
        <h2 className="shopping-cart-title">YOUR CART</h2>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="empty-shopping-cart">Your cart is empty!</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="shopping-cart-item">
              <img src={item.images?.[0]?.src || "placeholder.jpg"} alt={item.name || "Product"} className="cart-product-image" />
              <div className="cart-product-details">
                <h3 className="cart-product-name">{item.name}</h3>
                <div className="cart-product-footer">
                  <div className="cart-price-info">
                    <p>₹{item.price}</p>
                  </div>

                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="shopping-order-summary">
          <h3>Order Summary ({cart.length} item)</h3>
          <div className="summary-item">
            <span>Price</span>
            <span>₹{cart.reduce((total, item) => total + parseFloat(item.price || 0), 0)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{cart.reduce((total, item) => total + parseFloat(item.price || 0), 0)}</span>
          </div>
          <button className="shopping-checkout-btn">Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
