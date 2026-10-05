import { Link } from "react-router-dom";
import { PawPrint, ShieldCheck, Truck, HeartHandshake } from "lucide-react";
export default function Footer(){return <footer>
 <div className="footer-main">
  <div><div className="brand footer-brand"><span className="brand-mark"><PawPrint size={22}/></span><span>DOMESTIC<span>CARE</span></span></div><p>Animal knowledge, care resources and a trusted marketplace for domestic-animal families.</p></div>
  <div><h4>Explore</h4><Link to="/animals">Animals</Link><Link to="/products">Marketplace</Link><Link to="/care">Care Guide</Link><Link to="/assistant">AI Assistant</Link></div>
  <div><h4>Account</h4><Link to="/login">Login</Link><Link to="/register">Register</Link><Link to="/cart">Cart</Link></div>
 </div>
 <div className="footer-features"><span><ShieldCheck/> Secure accounts</span><span><Truck/> Order tracking</span><span><HeartHandshake/> Animal-first care</span></div>
 <div className="footer-bottom">© 2026 DomesticCare. Built as a MERN CSE project.</div>
 </footer>}
