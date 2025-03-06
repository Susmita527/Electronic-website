import React,{useState,useEffect} from 'react'
import { getSubCategories } from '../Api/Ecom'

function Subcategoryy() {
  const [Subcategory,setSubcategory]=useState([]);

  useEffect(() => {
        async function fetchCategories() {
          const data = await getSubCategories();
          setSubcategory(data);                                                 
        }
        fetchCategories();
      }, []);
  return (
    <div>
     <h2>Subcategories</h2>
      <ul>
        {Subcategory.length > 0 ? (
          Subcategory.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))
        ) : (
          <p>No subcategories found.</p>
        )}
      </ul>
    </div>
  );
}

export default Subcategoryy
