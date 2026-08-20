// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // <-- NEW IMPORT
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { WishlistProvider } from "./context/WishlistContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* <-- WRAP EVERYTHING */}
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
