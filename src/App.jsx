import React ,{useState} from 'react'

import Subcategoryy from '../Categoryfetch/Category'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"
import Banner from '../Components/Banner';
import ListProduct from '../Components/ListProduct'
import Categories from '../Components/Categories';
import Navbar from '../Components/Navbar';
import Search from '../Components/Search';   
import Footer from '../UI/Footer';
import ProductDetails from '../Components/ProductDetails';
import Wishlist from '../Components/Wishlist';
import AllProduct from '../Components/AllProduct';
import Cart from '../Components/Cart';
import { ToastContainer } from "react-toastify";
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import Success from '../UI/Success';

function App() {
 
  return (
    <div>
    <Router>
      <Navbar />
      <Categories />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/allproducts" element={<AllProduct />} />
        <Route path="/productlists/:categoryId" element={<ListProduct />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} />  
        <Route path="/success" element={<Success />} />  
      </Routes>
      <ToastContainer />
      <Footer/>
    </Router>
    </div>
  )
}

export default App
