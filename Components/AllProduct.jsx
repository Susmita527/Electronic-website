import React,{useEffect,useState} from 'react'
import { allProducts } from '../Api/Ecom';
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function AllProduct() {
  const[product,setProduct]=useState([])
  const [page,setPage]=useState(1);
  const[hasProduct,setHasProduct]=useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await allProducts(page); 
        if (data.length > 0) {
          setProduct((prev) => [...prev, ...data]); 
        } else {
          setHasProduct(false); 
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); 
  };

    const handleDetails = (productId) => {
      navigate(`/productdetails/${productId}`);
    };
 
  return (
    <>
    <div className="product-container">
        {product.length === 0 ? (
          <p className="loading-text">Loading products...</p>
        ) : (
          product.map((product) => (
            <div key={product.id} className="product-card" onClick={()=>handleDetails(product.id)}>
              <button className="wishlist-btnn">
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
      {hasProduct && (
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </>
    );
}

export default AllProduct
