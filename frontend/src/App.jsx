// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

// adjust to your backend base URL
const API_URL = "http://localhost:4000";

// Shared function to get transactions from localStorage
const getTransactionsFromStorage = () => {
  const saved = localStorage.getItem("transactions");
  return saved ? JSON.parse(saved) : [];
};

// Protected route component - UPDATED to check for token in storage
const ProtectedRoute = ({ user, children }) => {
  // Check if we have a token in storage (even if user state is null due to refresh)
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  const hasToken = localToken || sessionToken;
  
  if (!user && !hasToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * ScrollToTop
 * - listens to route changes and scrolls the window to top immediately.
 * - placed inside App so it runs for every route navigation.
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll instantly to top when pathname changes.
    // Using 'auto' to avoid animation and ensure the page is at top immediately.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Helper: persist user + token depending on remember flag
  const persistAuth = (userObj, tokenStr, remember = false) => {
    try {
      if (remember) {
        if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) localStorage.setItem("token", tokenStr);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        if (userObj) sessionStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) sessionStorage.setItem("token", tokenStr);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  };

  // Helper: clear auth
  const clearAuth = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } catch (err) {
      console.error("clearAuth error:", err);
    }
    setUser(null);
    setToken(null);
  };

  // Update user data in state and storage
  const updateUserData = (updatedUser) => {
    setUser(updatedUser);
    
    // Also update in storage to maintain consistency
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    
    if (localToken) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else if (sessionToken) {
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Try to load user+token on mount
  useEffect(() => {
    (async () => {
      try {
        const localUserRaw = localStorage.getItem("user");
        const sessionUserRaw = sessionStorage.getItem("user");
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const storedUser = localUserRaw ? JSON.parse(localUserRaw) : sessionUserRaw ? JSON.parse(sessionUserRaw) : null;
        const storedToken = localToken || sessionToken || null;
        const tokenFromLocal = !!localToken;

        if (storedUser) {
          setUser(storedUser);
          setToken(storedToken);
          setIsLoading(false);
          return;
        }

        if (storedToken) {
          try {
            const res = await axios.get(`${API_URL}/api/user/me`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            const profile = res.data;
            persistAuth(profile, storedToken, tokenFromLocal);
          } catch (fetchErr) {
            console.warn("Could not fetch profile with stored token:", fetchErr);
            clearAuth();
          }
        }
      } catch (err) {
        console.error("Error bootstrapping auth:", err);
      } finally {
        setIsLoading(false);
        try {
          setTransactions(getTransactionsFromStorage());
        } catch (txErr) {
          console.error("Error loading transactions:", txErr);
        }
      }
    })();
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (err) {
      console.error("Error saving transactions:", err);
    }
  }, [transactions]);

  // Public handlers that Login/Signup should call
  const handleLogin = (userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, tokenFromApi, remember);
    navigate("/");
  };

  const handleSignup = (userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, tokenFromApi, remember);
    navigate("/");
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  // transaction helpers
  const addTransaction = (newTransaction) => setTransactions((p) => [newTransaction, ...p]);
  const editTransaction = (id, updatedTransaction) => setTransactions((p) => p.map((t) => (t.id === id ? { ...updatedTransaction, id } : t)));
  const deleteTransaction = (id) => setTransactions((p) => p.filter((t) => t.id !== id));
  const refreshTransactions = () => setTransactions(getTransactionsFromStorage());

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ensure page jumps to top on every route change */}
      <ScrollToTop />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />

        {/* Protected layout + routes */}
        <Route
          element={
            <ProtectedRoute user={user}>
              <Layout
                user={user}
                onLogout={handleLogout}
                transactions={transactions}
                addTransaction={addTransaction}
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                refreshTransactions={refreshTransactions}
              />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard transactions={transactions} addTransaction={addTransaction} editTransaction={editTransaction} deleteTransaction={deleteTransaction} refreshTransactions={refreshTransactions} />} />
          <Route path="/income" element={<Income transactions={transactions} addTransaction={addTransaction} editTransaction={editTransaction} deleteTransaction={deleteTransaction} refreshTransactions={refreshTransactions} />} />
          <Route path="/expense" element={<Expense transactions={transactions} addTransaction={addTransaction} editTransaction={editTransaction} deleteTransaction={deleteTransaction} refreshTransactions={refreshTransactions} />} />
          <Route path="/profile" element={<Profile user={user} onUpdateProfile={updateUserData} onLogout={handleLogout} />} />
        </Route>

        {/* Redirect default */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
};

export default App;
