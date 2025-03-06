import axios from "axios";

const consumerKey = "ck_56744b29098d0eb3fc9febec23193f43fe86549b";
const consumerSecret = "cs_5374c49b885632c44634349b1cb4f98fdff1bf96";

const siteURL = "https://devfolio.co.in/onlinestore"; 

const Ecom = axios.create({
  baseURL: `${siteURL}/wp-json/wc/v3`,
  auth: {
    username: consumerKey,
    password: consumerSecret,
  },
});

//getting all products nnd categories
export const getProducts = async () => {
  try {
    const response = await Ecom.get("/products/categories",{
      params:{
        category:52,    
        per_page:100,
      }
    });
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

//getting parent categories
export const getCategories = async () => {
  try {
    const response = await Ecom.get("/products/categories",
      {params:{
      parent: 52,
        per_page: 20,
    }});
    console.log("Parent Categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching parent categories:", error);
    return [];
  }
};

//getting sub-categories
export const getSubCategories = async () => {
  try {
    const response = await Ecom.get("/products/categories", {
      params: {
        parent:52,
        per_page: 50,
      },
    });
    console.log("Categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching parent categories:", error);
    return [];
  }
};



//getting product using category
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await Ecom.get("/products",{
      params:{
        category:categoryId,
        per_page:20,
      }});
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const searchProduct=async(data)=>{
  try{
    const response = await Ecom.get("/products", {
      params: {
       category:52,
        search: data.toLowerCase(),
        per_page: 20,
      },
    });
    console.log("search product",response.data);
    return response.data;
  } catch(error){
    console.error(error);
    return [];
  }
}

export const getProductsById = async (productId) => {
  try {
    const response = await Ecom.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getFilteredProduct = async (categoryId, minPrice, maxPrice) => {
  try {
    const response = await Ecom.get(`/products?category=${categoryId}&min_price=${minPrice}&max_price=${maxPrice}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


export const allProducts = async () => {
  try {
    const response = await Ecom.get("/products",{
      params:{
       per_page:100,
        category:52,
      },
    })
    return response.data;
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
