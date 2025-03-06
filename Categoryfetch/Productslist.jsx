import React,{useState,useEffect} from 'react'
import { getProducts } from '../Api/Ecom'

function Productslist() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const data = await getProducts();
    setCategories(data);
  };

  // Helper function to get subcategories (child or grandchild)
  const getSubCategories = (parentId) =>
    categories.filter((a) => a.parent === parentId);

  return (
    <div className="categories-container">
      {categories
        .filter((cat) => cat.parent === 0) // Parent Categories
        .map((parent) => (
          <div key={parent.id} className="category-item">
            <h3>{parent.name} (ID: {parent.id})</h3>

            {getSubCategories(parent.id).map((child) => (
              <div key={child.id} className="subcategory">
                <h4>{child.name} (ID: {child.id})</h4>

          
                {getSubCategories(child.id).map((grandchild) => (
                  <p
                    key={grandchild.id}
                    className="grandchild-category"
                    onClick={() => console.log("Grandchild ID:", grandchild.id)}
                  >
                    {grandchild.name} (ID: {grandchild.id})
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default Productslist
