// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ArrowUp } from "lucide-react"; // lucide icon

import Home from "./pages/Home/Home";
import Watches from "./pages/Watches/Watches";
import Brand from "./pages/Brand/Brand";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import VerifyPaymentPage from "../VerifyPaymentPage";

/* ScrollToTopOnRouteChange: uses useLocation — OK because App is inside BrowserRouter in index.jsx */
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* ProtectedRoute wrapper
   Replace the isAuthenticated check with your real auth logic:
   - If you use Firebase: check firebaseAuth.currentUser or use useAuthState(...)
   - If you use Auth context: read context value here
*/
function ProtectedRoute({ children }) {
  const location = useLocation();

  // === Example auth checks (choose one) ===
  // 1) LocalStorage token (quick example)
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  // 2) If you have an AuthContext:
  // const { user } = useContext(AuthContext);
  // const isAuthenticated = !!user;

  // 3) If you use Firebase Auth (example):
  // const [user, loading] = useAuthState(firebaseAuth);
  // if (loading) return <LoadingComponent />;
  // const isAuthenticated = !!user;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide horizontal overflow globally to eliminate the right-side gap/scroll
  useEffect(() => {
    const prevOverflowX = document.documentElement.style.overflowX;
    const prevBodyMargin = document.body.style.margin;
    // hide horizontal overflow but keep vertical scrolling
    document.documentElement.style.overflowX = "hidden";
    // ensure body has no default margin that can create gaps
    document.body.style.margin = "0";

    return () => {
      document.documentElement.style.overflowX = prevOverflowX || "";
      document.body.style.margin = prevBodyMargin || "";
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    // Top-level wrapper prevents children from exceeding viewport width
    <div className="min-h-screen w-screen overflow-x-hidden antialiased">
      <ScrollToTopOnRouteChange />

      {/* Only Route (or Fragment) components as direct children of Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/brands/:brandName" element={<Brand />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected /cart route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Optionally protect orders too */}
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/orders/success" element={<VerifyPaymentPage />} />
        <Route path="/orders/cancel" element={<VerifyPaymentPage />} />
      </Routes>

      {/* Floating scroll-to-top button (outside <Routes>) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-6 bottom-6 z-50 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300
          ${
            showButton
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-6 pointer-events-none"
          }
          bg-gray-400 text-white hover:bg-amber-700`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
