import { createContext, useContext, useEffect, useMemo, useState } from "react";
const CartContext=createContext(null);
export function CartProvider({children}){
  const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem("dac_cart")||"[]"));
  useEffect(()=>localStorage.setItem("dac_cart",JSON.stringify(cart)),[cart]);
  const add=(p)=>setCart(c=>{const found=c.find(i=>i.product===p._id); return found?c.map(i=>i.product===p._id?{...i,quantity:i.quantity+1}:i):[...c,{product:p._id,name:p.name,image:p.image,price:p.price,discount:p.discount,stock:p.stock,quantity:1}]});
  const remove=id=>setCart(c=>c.filter(i=>i.product!==id));
  const update=(id,q)=>setCart(c=>c.map(i=>i.product===id?{...i,quantity:Math.max(1,Math.min(Number(q),i.stock||99))}:i));
  const clear=()=>setCart([]);
  const subtotal=useMemo(()=>cart.reduce((s,i)=>s+(i.price*(1-i.discount/100))*i.quantity,0),[cart]);
  return <CartContext.Provider value={{cart,add,remove,update,clear,subtotal,count:cart.reduce((s,i)=>s+i.quantity,0)}}>{children}</CartContext.Provider>
}
export const useCart=()=>useContext(CartContext);
