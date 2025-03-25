import React,{useEffect,useState} from 'react'
import { useParams} from "react-router-dom";
import { getProductsById } from '../Api/Ecom';
import "../src/Styles/productdetails.css"
import HandleAddtoCart from './HandleAddtoCart';

function ProductDetails() {
      const { productId } = useParams(); 
      const [product, setProduct] = useState(null);
      const[cart,setCart]=useState([]);
      useEffect(() => {
            const fetchProductDetails = async () => {
              const data = await getProductsById(productId);
              setProduct(data);
            };
        
            fetchProductDetails();
          }, [productId]);
          if (!product) return <h2>Loading...</h2>;
  return (
      <div className="productt-container">
      <div className="productt-image">
        <img src={product.images[0]?.src} alt={product.name} />
      </div>
      <div className="productt-details">
        <h2 className="productt-title">{product.name}</h2>
        <p className="productt-price">₹{product.price}</p>
        <p className="productt-description" dangerouslySetInnerHTML={{ __html: product.description }}></p>
        <div className="buttons">
          <button className="add-to-cartt" onClick={()=>HandleAddtoCart(product,setCart)}>Add to Cart</button>
          
        </div>
      </div>
    </div>
  );
  
}

export default ProductDetails
