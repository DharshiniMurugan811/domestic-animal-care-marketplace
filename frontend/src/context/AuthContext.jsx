import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("dac_token");
    if (!token) return setLoading(false);
    api.get("/auth/me").then(r=>setUser(r.data)).catch(()=>localStorage.removeItem("dac_token")).finally(()=>setLoading(false));
  },[]);
  const login = async data => { const r=await api.post("/auth/login",data); localStorage.setItem("dac_token",r.data.token); setUser(r.data.user); return r.data; };
  const register = async data => { const r=await api.post("/auth/register",data); localStorage.setItem("dac_token",r.data.token); setUser(r.data.user); return r.data; };
  const logout = () => { localStorage.removeItem("dac_token"); setUser(null); };
  return <AuthContext.Provider value={{user,loading,login,register,logout}}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext);
