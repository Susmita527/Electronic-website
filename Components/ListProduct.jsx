import React, { useEffect, useState } from "react";
import { getProductsByCategory, getFilteredProduct } from "../Api/Ecom";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import Filter from "../UI/Filter";
import "../src/Styles/productlist.css";

function ListProduct() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);           
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByCategory(categoryId);
      console.log("Category Products:", data);
      setProducts(data);
      setFilteredProducts(data); 
    };
    fetchProducts();
  }, [categoryId]);

  const handleDetails = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  const handleFilterChange = async (selectedRanges, selectedBrands) => {
    try {
      let results = [];
      if (selectedRanges.length > 0) {
        for (const range of selectedRanges) {
          const fetched = await getFilteredProduct(categoryId, range.min, range.max);
          results.push(...fetched);
          console.log("if condition",fetched)
        }
      } else {
     
        results = [...products];
        console.log("else part",results)
      }


      if (selectedBrands.length > 0) {
        results = results.filter((product) => {
          const productBrand = product.brands?.[0]?.name?.toLowerCase(); 
          return (
            productBrand &&
            selectedBrands
              .map(b => b.toLowerCase())
              .includes(productBrand)
          );
        });
      }

      
      const uniqueResults = Array.from(new Map(results.map(p => [p.id, p])).values());

      console.log("Filtered Products:", uniqueResults);
      setFilteredProducts(uniqueResults);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  const handleWishlist = (product) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Retrieve existing wishlist
    const existingWishlistItem = storedWishlist.find((item) => item.id === product.id);
    
    if (!existingWishlistItem) {
        const updatedWishlist = [...storedWishlist, product]; // Append product to existing list
        setWishlist(updatedWishlist); // Update state
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Store in localStorage
    }
    
    // navigate("/wishlist"); // Navigate after updating localStorage
};
 
  

  return (
    <div className="product-page">
      <div className="filters-section">
        <Filter FilterChange={handleFilterChange} products={products} />
      </div>

      <div className="product-container">
        {filteredProducts.length === 0 ? (
          <p className="loading-text">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleDetails(product.id)}
            >
              <button className="wishlist-btn" 
              onClick={(e) => {
                e.stopPropagation(); 
                handleWishlist(product);
              }}
              >
                <FaRegHeart  style={{ color: wishlist.find((item) => item.id === product.id) ? "red" : "white" }}  />
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
          ))
        )}
      </div>
    </div>
  );
}

export default ListProduct;
