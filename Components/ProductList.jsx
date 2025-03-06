import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../Api/Ecom'
import "../src/Styles/productlist.css"
import { FaRegHeart } from "react-icons/fa";

function ProductList(){
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();

    const handleDetails = (productId) => {
      navigate(`/productdetails/${productId}`);
    };
  

    useEffect(() => {
        if (categoryId) {
            getProductsByCategory(categoryId).then(setProducts);
        }
    }, [categoryId]);
  return (
    
    <div className="product-container">
    {products.length === 0 ? (
      <p className="loading-text">Loading products...</p>
    ) : (
      products.map((product) => (
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

export default ProductList
