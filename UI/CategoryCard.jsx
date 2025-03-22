import React,{useEffect,useState} from 'react'
import { getCategories } from '../Api/Ecom';
import { useNavigate } from "react-router-dom";

import "../src/Styles/categorycard.css"


function CategoryCard() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
   navigate(`/productlists/${categoryId}`);;
  };
   

  return (
    <div className="category-container">
      {categories.map((category) => (
        <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category.id)}>
          <h3 className="category-title">{category.name}</h3>
          <img src={category.image?.src || "/images/default.jpg"} alt={category.name} className="category-image" />
        </div>
      ))}
    </div>
  );
}

export default CategoryCard

