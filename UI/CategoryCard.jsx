import React,{useEffect,useState} from 'react'
import { getCategories } from '../Api/Ecom';
import { useNavigate } from "react-router-dom";

import "../src/Styles/categorycard.css"

// const category=[
//     {name:"Tablets" ,img:"/images/tabb.webp"},
//     {name:"Laptops" ,img:"/images/lapp.webp"},
//     {name:"EarPhones" ,img:"/images/ear.webp"},
//     {name:"Television" ,img:"/images/tvv.webp"},
//     {name:"Mobile Phones" ,img:"/images/ph.webp"},
//     {name:"Washing Machines" ,img:"/images/wash.webp"},
//     {name:"Sound Bar" ,img:"/images/sound.webp"},
//     {name:"Air Conditioner" ,img:"/images/acc.webp"},
//     {name:"Oven" ,img:"/images/ovn.webp"},

// ]

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

