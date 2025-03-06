import React,{useState,useEffect} from 'react'
import { getSubCategories } from '../Api/Ecom'

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchParentCategories = async () => {
          const data = await getSubCategories();
          setCategories(data);
        };
    
        fetchParentCategories();
      }, []);
    
      return (
        <div>
          <h2>Sub-categories Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name} (id:{category.id})</li>
            ))}
           
          </ul>
          {console.log(categories)}
        </div>
      );
}

export default Category
