import { toast } from "react-toastify";

export const HandleAddtoCart = (product, setCart) => {
  console.log("Add to Cart clicked for:", product.name);

  let storedCart = JSON.parse(localStorage.getItem("cart")) || []; 
  const existingItem = storedCart.find((item) => item.id === product.id);

  if (existingItem===undefined) {
    storedCart.push({ ...product });
    setCart(storedCart); 
    localStorage.setItem("cart", JSON.stringify(storedCart));

    toast.success("Product added to cart!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else {
    toast.info("Product already in cart!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
export default HandleAddtoCart
