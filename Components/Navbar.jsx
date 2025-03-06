import React ,{useState}from 'react'
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaHeart, FaHome,FaChevronRight } from "react-icons/fa";
import "../src/Styles/navbar.css"
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
  const[data,setData]=useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate=useNavigate();

  const handleSearch=()=>{
      navigate(`/search/${data}`);
      setData(""); 
    
  }

  return (
    // Details
    <nav className="navbar">
    <div className="nav-left">
      <h1 className="logo">Electronic<span className="logo-dot">.</span></h1>
         {/* drop-down menu */}
      <div className="dropdown">
      <button className="menu-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <FaBars className="menu-icon" />
        <span>Menu</span>
      </button>
       {dropdownOpen && (
              <div className="dropdown-content">
                 <Link to="/allproducts">🛒 All Products  <FaChevronRight /></Link>
                <Link to="/productlists/43">📺 Televisions  </Link>
                <Link to="/productlists/141">💻 Laptops </Link>
                <Link to="/productlists/138">📱 Mobile Phones </Link>
                <Link to="/productlists/144">📟 Tablets </Link>
                <Link to="/productlists/99">🍳 Kitchen Appliances </Link>
                <Link to="/productlists/100">🎤 Microwave Ovens</Link>
              </div>
    )}
      </div>
      </div>

   
    <div className="search-container">
      <input type="text" placeholder="What are you looking for ?" className="search-bar"
      value={data} onChange={(e)=>setData(e.target.value)}  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="search-icon" onClick={handleSearch}><FaSearch /></button>
    </div>

    <div className="nav-right">
      
    <Link to="/" className="nav-btn" onClick={()=>navigate("/")}>
          <FaHome className="icon" />
        </Link>

        <Link to="/wishlist" className="nav-btn">
          <FaHeart className="icon wishlist-icon" />
        </Link>

        <Link to="/login" className="nav-btn">
          <FaUser className="icon" />
        </Link>

        <Link to="/cart" className="cart-container">
          <FaShoppingCart className="icon cart-icon" />
          <span className="cart-count">0</span>
        </Link>
      </div>
    </nav>
);
}

export default Navbar
