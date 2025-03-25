import React ,{useState,useEffect}from 'react'
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaHeart, FaHome,FaChevronRight } from "react-icons/fa";
import "../src/Styles/navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
function Navbar() {
  const[data,setData]=useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenLogin, setDropdownOpenLogin] = useState(false);
  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const auth = getAuth(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => unsubscribe(); 
  }, [auth]);

  const handleSearch=()=>{
      navigate(`/search/${data}`);
      setData(""); 
  }

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        
     
        <div className="dropdown">
          <button className="nav-btn" onClick={() => setDropdownOpenLogin(!dropdownOpenLogin)}>
            <FaUser className="icon" />
          </button>
          {dropdownOpenLogin && (
            <div className="dropdown-content">
               {user ? (
                <>
                  <Link to="/profile">👤 Profile</Link>
                  <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">🔑 Login</Link>
                  <Link to="/signup">📝 Signup</Link>
                </>
              )}
            </div>
          )}
        </div>
        

        <Link to="/cart" className="cartt-container">
          <FaShoppingCart className="icon cartt-icon" />
          {/* <span className="cartt-count">0</span> */}
        </Link>
      </div>
    </nav>
);
}

export default Navbar
