import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { searchProduct } from '../Api/Ecom'

function Search() {
      const {value}=useParams();
      const[search,setSearch]=useState([]);

      useEffect(()=>{
            const fetchProduct= async()=>{
              // console.log("Fetched Products:", fetchProduct);
            const product=await searchProduct(value);
            setSearch(product);
            // console.log("search console",product);
            };
            fetchProduct();
      },[value])
      
  return (
      <div className="search-results">
      <h2>Search results for "{value}"</h2>
      {/* {console.log("searching",search)} */}
      {search.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-container">
          {search.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.images[0]?.src }
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search
