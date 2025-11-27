import React, { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function CartPage() {
    const { cart, increment, decrement, removeItem, clearCart, totalItems, totalPrice } = useCart()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [note, setNote] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    const handleMobileChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10)
        setMobile(digitsOnly)
    }

    const isFormValid = () => {
        if (!name.trim() || !email.trim() || !address.trim() || !mobile.trim() || !paymentMethod.trim()) {
            return false
        }

    }

    const processPayment = (method) => {
        if (method === "Cash on Delivery") return true
        if (method === "Online") {
            return Math.random() < 0.75
        }
        return false
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Order submission attemp:", {
            form: { name, email, address, mobile, note, paymentMethod },
            cart,
            totals: { totalItems, totalPrice },
            timestamp: new Date().toISOString()
        })

        if (!isFormValid()) {
            toast.error("Please fill all required fields correctly", {
                position: 'top-right'
            })
            return
        }

        if (!cart.length) {
            toast.error("Your cart is empty", {
                position: 'top-right'
            })
            return
        }

        const paymentOk = processPayment(paymentMethod)

        if (paymentOk) {
            console.log("Payment Succeeded", {
                form: { name, email, address, mobile, note, paymentMethod },
                cart,
                totals: { totalItems, totalPrice },
                timestamp: new Date().toISOString()
            })

            clearCart()

            setName("")
            setEmail("")
            setAddress("")
            setMobile("")
            setNote("")
            setPaymentMethod("")

            toast.success("Payment successful - order completed", { position: 'top-right' })
            return
        } else {
            console.log("Payment failed for order:", {
                form: { name, email, address, mobile, note, paymentMethod },
                cart,
                totals: { totalItems, totalPrice },
                timestamp: new Date().toISOString()
            })

            toast.error("Payment fialed. Please try again", { position: 'top-right' })
            return
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 lg:py8 px-4 sm:px-8 lg:px-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
                        <div className="flex items-center gap-2 text-gray-800 mb-4 sm:mb-0">
                            <Link
                                to="/watches"
                                className="flex items-center gap2 text-gray-800 cursor-pointer transition-colors"
                                aria-label="Back to watches"
                            >
                                <div className="p-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-md transition-all">
                                    <ArrowLeft size={20} />
                                </div>
                                <span className="font-medium">Back to watches</span>
                            </Link>
                        </div>
                        <h1 className="text-3xl xl:pt-20 xl:ml-65 ml-5 pt-5 md:ml-15 md:pt-20 lg:ml-50 font-[pacifico] font-bold text-gray-700">
                            Your Shopping Cart
                        </h1>
                        <button
                            onClick={clearCart}
                            className="mt-4 sm:mt-0 sm:ml-auto text-red-500 cursor-pointer flex items-center gap-1"
                            aria-label="clear cart"
                        >
                            <Trash2 size={18} />
                            clear cart
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 space-y-6 order-1">
                            <div className="bg-white font-[pacifico] rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter your details</h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    All fields are required.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Full name"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"
                                            required
                                            aria-label="Full name"
                                        />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"
                                            required
                                            aria-label="Email"
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        value={mobile}
                                        onChange={handleMobileChange}
                                        placeholder="Mobile number (10 digits)"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"
                                        required
                                        aria-label="Mobile number"
                                        maxLength={10}
                                        inputMode="numeric"
                                        pattern="\d{10}"
                                    />

                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Address"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150 resize-y"
                                        required
                                        aria-label="Address"
                                    />

                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150"
                                        required
                                        aria-label="Payment Method"
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="Online">Online</option>
                                        <option value="Cash on Delivery">Cash on Delivery</option>
                                    </select>

                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Message / delivery instructions (optional)"
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:shadow-md focus:scale-[1.01] transition-transform duration-150 resize-y"
                                        aria-label="Message"
                                    />

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-gray-300 to-gray-500 text-white py-3 rounded-full cursor-pointer transition-colors"
                                        >
                                            Submit Order
                                        </button>

                                        <Link
                                            to="/"
                                            className="px-6 py-3 border border-gray-500 text-black rounded-full transition-all text-center"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </form>
                            </div>

                            {/* Cart Items */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="relative h-48 overflow-hidden flex items-center justify-center p-4">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="h-full w-full object-contain transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">{item.name}</h3>
                                            <p className="text-gray-600 font-semibold text-md mb-4">{item.price}</p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => decrement(item.id)}
                                                        className="text-gray-600 cursor-pointer  p-1"
                                                        aria-label={`Decrease ${item.name} quantity`}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                                                    <button
                                                        onClick={() => increment(item.id)}
                                                        className="text-gray-600 cursor-pointer  p-1"
                                                        aria-label={`Increase ${item.name} quantity`}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500 cursor-pointer  p-2"
                                                    aria-label={`Remove ${item.name}`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 order-2">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                                    <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (8%)</span>
                                    <span className="font-medium">₹{totalPrice * 0.08}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold border-t pt-4 mb-6">
                                <span>Total</span>
                                <span>₹{(totalPrice*1.08).toFixed(2)}</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}