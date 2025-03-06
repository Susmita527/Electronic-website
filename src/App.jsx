import React ,{useState} from 'react'
import Productslist from '../Categoryfetch/Productslist'
import Subcategoryy from '../Categoryfetch/Category'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"

import Category from '../Categoryfetch/Category';
import Banner from '../Components/Banner';
import ListProduct from '../Components/ListProduct'
import Categories from '../Components/Categories';
import ProductList from '../Components/ProductList';
import Navbar from '../Components/Navbar';
import Search from '../Components/Search';   
import Footer from '../UI/Footer';
import ProductDetails from '../Components/ProductDetails';
import Wishlist from '../Components/Wishlist';
import AllProduct from '../Components/AllProduct';

function App() {
 
  return (
    <div>
    <Router>
      <Navbar />
      <Categories />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/allproducts" element={<AllProduct />} />
        <Route path="/products/:categoryId" element={<ProductList />} />
        <Route path="/productlists/:categoryId" element={<ListProduct />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer/>
    </Router>
    </div>
  )
}

export default App
