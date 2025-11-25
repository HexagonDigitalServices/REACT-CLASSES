import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addItem = (item) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === item.id)
            if (existing) {
                return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
            }
            return [...prev, { ...item, qty: 1 }]
        })
    }

    const increment = (id) => {
        setCart((prev) =>
            prev.map((p) => p.id === id ? { ...p, qty: p.qty + 1 } : p)
        )
    }

    const decrement = (id) => {
        setCart((prev) =>
            prev.map((p) => p.id === id ? { ...p, qty: p.qty - 1 } : p)
                .filter((p) => p.qty > 0) // remove item if qty = 0
        )
    }

    const removeItem = (id) => {
        setCart((prev) => prev.filter((p) => p.id !== id))
    }

    const parsePrice = (price) => {
        if (typeof price === "number" && isFinite(price)) return price
        if (!price) return 0

        let s = String(price).trim()
        s = s.replace(/[^0-9.\-]/g, "")
        const parts = s.split(".") // 900.90 -> [900,90]
        if (parts.length > 2) {
            const first = parts.shift()
            s = first + "." + parts.join("")
        }
        const n = parseFloat(s)
        return Number.isFinite(n) ? n : 0
    }

    const clearCart = () => setCart([])

    const totalItems = cart.reduce((sum, p) => sum + (p.qty || 0), 0)
    const totalPrice = cart.reduce((sum, p) => sum + (p.qty || 0) * parsePrice(p.price), 0)

    return (
        <CartContext.Provider
            value={{ cart, addItem, increment, decrement, removeItem, totalItems, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    )


}

export const useCart = () =>useContext(CartContext)