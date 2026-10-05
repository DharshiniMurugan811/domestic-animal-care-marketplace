import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, UserCircle, Menu, X, PawPrint } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar(){
 const {user,logout}=useAuth(); const {count}=useCart(); const [open,setOpen]=useState(false); const nav=useNavigate();
 const exit=()=>{logout();nav("/");};
 return <header className="navbar">
   <div className="nav-inner">
    <Link className="brand" to="/"><span className="brand-mark"><PawPrint size={22}/></span><span>DOMESTIC<span>CARE</span></span></Link>
    <button className="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    <nav className={open?"nav-links open":"nav-links"}>
      <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
      <Link to="/animals" onClick={()=>setOpen(false)}>Animals</Link>
      <Link to="/products" onClick={()=>setOpen(false)}>Marketplace</Link>
      <Link to="/care" onClick={()=>setOpen(false)}>Care Guide</Link>
      <Link to="/assistant" onClick={()=>setOpen(false)}>AI Assistant</Link>
    </nav>
    <div className="nav-actions">
      <Link to="/favorites" className="icon-btn" title="Favorites"><Heart size={19}/></Link>
      <Link to="/cart" className="icon-btn cart-icon"><ShoppingCart size={19}/><b>{count}</b></Link>
      {user ? <div className="user-menu"><Link to={user.role==="admin"?"/admin":"/profile"}><UserCircle size={20}/><span>{user.name?.split(" ")[0]}</span></Link>{user.role==="admin"&&<span className="admin-badge">ADMIN</span>}<button onClick={exit}>Logout</button></div> : <Link className="login-link" to="/login">Login</Link>}
    </div>
   </div>
 </header>
}
