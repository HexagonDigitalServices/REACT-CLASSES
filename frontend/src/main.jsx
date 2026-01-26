// src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>           {/* <<-- ONE BrowserRouter here */}
      <CartProvider>          {/* CartProvider inside router (okay) */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
