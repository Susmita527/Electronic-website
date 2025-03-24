import React, { useEffect, useState } from "react";
import { getProductsByCategory, getFilteredProduct } from "../Api/Ecom";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import Filter from "../UI/Filter";
import "../src/Styles/productlist.css";
import Pagenation from "../UI/Pagenation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HandleAddtoCart from "./HandleAddtoCart";



function ListProduct() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);           
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [wishlist, setWishlist] = useState([]);
  const [cart,setCart]=useState([]);
  const [currentPage,setCurrentpage]=useState(1);
  const [postPerPage]=useState(4);
  const navigate = useNavigate();

  //calling api
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByCategory(categoryId);
      console.log("Category Products:", data);
      setProducts(data);
      setFilteredProducts(data); 
    };
    fetchProducts();
  }, [categoryId]);

  //handling product description
  const handleDetails = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  //handling price and brand filter 
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

  //handling wishlist
  const handleWishlist = (product) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Retrieve existing wishlist
    const existingWishlistItem = storedWishlist.find((item) => item.id === product.id);
    
    if (!existingWishlistItem) {
        const updatedWishlist = [...storedWishlist, product]; // Add product in existing list
        setWishlist(updatedWishlist); // Update state
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Store in localStorage
    }
    // navigate("/wishlist"); 
};


 //pagination
const lastPostIndex = currentPage * postPerPage;
const firstPostIndex = lastPostIndex - postPerPage;
const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="product-page">
      <div className="filters-section">
        <Filter FilterChange={handleFilterChange} products={products} />
      </div>

      <div className="product-container">
        {currentPosts.length === 0 ? (
          <p className="loading-text">No products found.</p>
        ) : (
          currentPosts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              
            >
              <button className="wishlist-btnn" 
              onClick={(e) => {
                e.stopPropagation(); 
                handleWishlist(product);
              }}
              >
              <FaRegHeart  style={{ color: wishlist.find((item) => item.id === product.id) ? "red" : "white" }}  />
              </button>
              <img
                src={product.images?.[0]?.src}
                alt={product.name}
                className="product-image"
                onClick={() => handleDetails(product.id)}
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button className="add-to-cart" onClick={()=>HandleAddtoCart(product,setCart)}>Add to cart</button>
            </div>
          ))
        )}
      </div>
      <Pagenation totalPosts={products.length}
      postperpage={postPerPage}
      setCurrentpage={setCurrentpage} 
      currentPage={currentPage}
      />
    </div>
  );
}

export default ListProduct;
