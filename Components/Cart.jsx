import React, { useEffect, useState } from "react";
import "../src/Styles/cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate(); 
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    console.log("Cart Data:", cart); 
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("after cart",cart);
  }, [cart]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to proceed to checkout.");
      navigate("/login");  
      return;
    }
    const isScriptLoaded = await loadRazorpayScript();
    
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay. Please check your internet connection.");
      return;
    }

    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0) * 100;

    const options = {
      key: "rzp_test_x4P0tyK1rutmlg", 
      amount: totalAmount,
      currency: "INR",
      name: "Electronic Store",
      description: "Purchase Products",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/success");
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div className="shopping-cart-page">
      <div className="shopping-cart-container">
        <h2 className="shopping-cart-title">YOUR CART</h2>

       
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
          <button className="shopping-checkout-btn" onClick={handlePayment}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
