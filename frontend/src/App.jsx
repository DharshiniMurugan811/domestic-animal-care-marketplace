import { Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar"; import Footer from "./components/Footer"; import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home"; import Animals from "./pages/Animals"; import AnimalDetail from "./pages/AnimalDetail"; import Products from "./pages/Products"; import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login"; import Register from "./pages/Register"; import Cart from "./pages/Cart"; import Checkout from "./pages/Checkout"; import Orders from "./pages/Orders"; import Profile from "./pages/Profile"; import Favorites from "./pages/Favorites"; import Care from "./pages/Care"; import Assistant from "./pages/Assistant"; import Quiz from "./pages/Quiz"; import AgeCalculator from "./pages/AgeCalculator"; import Admin from "./pages/Admin"; import NotFound from "./pages/NotFound";
export default function App(){return <><Navbar/><main><Routes>
<Route path="/" element={<Home/>}/><Route path="/animals" element={<Animals/>}/><Route path="/animals/:id" element={<AnimalDetail/>}/><Route path="/products" element={<Products/>}/><Route path="/products/:id" element={<ProductDetail/>}/>
<Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/cart" element={<Cart/>}/><Route path="/care" element={<Care/>}/><Route path="/assistant" element={<Assistant/>}/><Route path="/quiz" element={<Quiz/>}/><Route path="/age-calculator" element={<AgeCalculator/>}/>
<Route element={<ProtectedRoute/>}><Route path="/checkout" element={<Checkout/>}/><Route path="/orders" element={<Orders/>}/><Route path="/profile" element={<Profile/>}/><Route path="/favorites" element={<Favorites/>}/></Route>
<Route element={<ProtectedRoute admin/>}><Route path="/admin/*" element={<Admin/>}/></Route>
<Route path="*" element={<NotFound/>}/>
</Routes></main><Footer/></>}
