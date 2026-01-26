// src/pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_BASE = "http://localhost:4000";

function CartProduct({ item }) {
  const { increment, decrement, removeItem } = useCart();
  const [localQty, setLocalQty] = useState(item.qty ?? 1);

  useEffect(() => {
    setLocalQty(Number(item.qty ?? item.quantity ?? 1));
  }, [item.qty, item.quantity]);

  const onInc = () => {
    setLocalQty((q) => (Number.isFinite(q) ? q + 1 : 1));
    increment(item.id);
  };

  const onDec = () => {
    const currentQty = item.qty ?? localQty;
    if (currentQty <= 1) {
      removeItem(item.id);
      return;
    }
    setLocalQty((q) => (Number.isFinite(q) ? q - 1 : currentQty - 1));
    decrement(item.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden flex items-center justify-center p-4">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-contain transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">
          {item.name}
        </h3>
        <p className="text-gray-600 font-semibold text-md mb-4">{item.price}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1">
            <button
              onClick={onDec}
              className="text-gray-600 cursor-pointer p-1"
              aria-label={`Decrease ${item.name} quantity`}
            >
              <Minus size={16} />
            </button>

            <span className="text-sm font-medium w-6 text-center">
              {localQty}
            </span>

            <button
              onClick={onInc}
              className="text-gray-600 cursor-pointer p-1"
              aria-label={`Increase ${item.name} quantity`}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 cursor-pointer p-2"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const {
    cart,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleMobileChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(digitsOnly);
  };

  const isFormValid = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !mobile.trim() ||
      !paymentMethod.trim()
    )
      return false;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9]{10}$/.test(mobile.replace(/\s+/g, ""));
    return emailOk && phoneOk;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all required fields correctly.", {
        position: "top-right",
      });
      return;
    }
    if (!cart.length) {
      toast.error("Your cart is empty.", { position: "top-right" });
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to place the order.", {
        position: "top-right",
      });
      return;
    }

    const itemsPayload = cart.map((it) => ({
      productId: it.productId ?? it.id,
      name: it.name,
      img: it.img,
      price: Number(it.price ?? 0),
      qty: Number(it.qty ?? it.quantity ?? 1),
      //description: it.description ?? "",
    }));

    const body = {
      name,
      email,
      phoneNumber: mobile,
      address,
      notes: note,
      paymentMethod,
      items: itemsPayload,
    };

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/api/orders`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.success) {
        const checkoutUrl = res.data.checkoutUrl ?? null;
        clearCart();
        if (checkoutUrl) {
          toast.info("Redirecting to payment...", { position: "top-right" });
          window.location.href = checkoutUrl;
          return;
        }
        setName("");
        setEmail("");
        setAddress("");
        setMobile("");
        setNote("");
        setPaymentMethod("");
        toast.success("Order placed successfully.", { position: "top-right" });
        return;
      }

      toast.error(res?.data?.message ?? "Failed to create order", {
        position: "top-right",
      });
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;
      if (status === 401) {
        toast.error("Authentication error — please log in again.", {
          position: "top-right",
        });
      } else {
        toast.error(serverMsg ?? "Failed to create order. Try again later.", {
          position: "top-right",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart.length) {
    return (
      <>
        <ToastContainer />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="max-w-md text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any watches to your cart yet.
            </p>
            <Link
              to="/watches"
              className="px-6 py-3 font-semibold text-black bg-gradient-to-br from-gray-200 to-gray-400 rounded-full transition-all inline-block"
            >
              Browse Watches
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-gray-800 mb-4 sm:mb-0">
              <Link
                to="/watches"
                className="flex items-center gap-2 text-gray-800 cursor-pointer transition-colors"
                aria-label="Back to watches"
              >
                <div className="p-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-md transition-all">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-medium">Back to Watches</span>
              </Link>
            </div>

            <h1 className="text-3xl xl:pt-20 ml-5 pt-5 font-[pacifico] font-bold text-gray-700">
              Your Shopping Cart
            </h1>

            <button
              onClick={clearCart}
              className="mt-4 sm:mt-0 sm:ml-auto text-red-500 cursor-pointer flex items-center gap-1"
              aria-label="Clear cart"
            >
              <Trash2 size={18} /> Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6 order-1">
              <div className="bg-white font-[pacifico] rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Enter your details
                </h2>
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
                      required
                      aria-label="Full name"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
                      required
                      aria-label="Email"
                    />
                  </div>

                  <input
                    type="text"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Mobile number (10 digits)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
                    required
                    aria-label="Mobile number"
                  />

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none resize-y"
                    required
                    aria-label="Address"
                  />

                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none resize-y"
                    aria-label="Message"
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-gray-300 to-gray-500 text-white py-3 rounded-full cursor-pointer"
                    >
                      {submitting ? "Processing…" : "Submit Order"}
                    </button>

                    <Link
                      to="/"
                      className="px-6 py-3 border border-gray-500 text-black rounded-full text-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cart.map((item) => (
                  <CartProduct key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 order-2">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">
                    ₹{(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold border-t pt-4 mb-6">
                <span>Total</span>
                <span>₹{(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
