import React,{useEffect,useState} from 'react'
import { allProducts } from '../Api/Ecom';
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function AllProduct() {
  const[product,setProduct]=useState([])
  const navigate=useNavigate();
  useEffect(() => {
      const fetchProducts = async () => {
        const data = await allProducts();
        console.log("Category Products:", data);
        setProduct(data);
      };
      fetchProducts();
    }, []);

    const handleDetails = (productId) => {
      navigate(`/productdetails/${productId}`);
    };
      
  return (
     <div className="product-container">
        {product.length === 0 ? (
          <p className="loading-text">Loading products...</p>
        ) : (
          product.map((product) => (
            <div key={product.id} className="product-card" onClick={()=>handleDetails(product.id)}>
              <button className="wishlist-btn">
                <FaRegHeart />
              </button>
              <img
                src={product.images && product.images.length > 0 ? product.images[0].src : "placeholder.jpg"}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button className="add-to-cart">Add to cart</button>
            </div>
          ))
        )}
      </div>
    );
}

export default AllProduct
