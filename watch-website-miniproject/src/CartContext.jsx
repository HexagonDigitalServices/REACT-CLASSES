import React,{createContext,useContext,useState,useEffect} from "react";

const CartContext = createContext()

export function CartProvider ({children}){
    const [cart,setCart] = useState(()=>{
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored):[]
    })

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    const addItem = (item) => {
        setCart((prev)=>{
            const existing = prev.find((p)=>p.id === item.id)
            if(existing){
                return prev.map((p)=> p.id ===item.id?{...p,qty:p.qty+1}:p)
            }
            return [...prev, {...item,qty:1}]
        })
    }

    const increment = (id) =>{
        setCart((prev)=>
        prev.map((p)=> p.id ===item.id?{...p,qty:p.qty+1}:p)
    )}

    
}