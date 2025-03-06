import React from 'react'
import "../src/Styles/category.css"
import { useNavigate } from "react-router-dom";

const categories = [
    { id:100, name: "Ovens", img: "/images/ovenn.png" },
    { id:44, name: "Televisions", img: "/images/tv.jpg" },
    { id:119, name: "Air Conditioners", img: "/images/ac.jpg" },
    { id:141,name: "Laptops", img: "/images/lapi.jpg" },
    { id:83, name: "Earphones", img: "/images/earphones.jpg" },
    { id:89, name: "Sound Bars", img: "/images/soundbars.jpg" },
    { id:138, name: "Mobile Phones", img: "/images/iph.jpg" },
    { id:144 ,name: "Tablets", img: "/images/tab.jpg" },
    { id:118, name: "Washing Machines", img: "/images/washing.png" },
]
function Categories() {
    const navigate = useNavigate();
    const handleCategoryClick = (categoryId) => {
        navigate(`/products/${categoryId}`);
      };
  return (
    <div className="categories-container">
    {categories.map((category) => (
        <div key={category.id} className="category-item"
           onClick={() => handleCategoryClick(category.id)}>
            <img src={category.img} alt={category.name} className="category-icon" />
            {category.name}
        </div>
    ))}
</div>
);
}

export default Categories
