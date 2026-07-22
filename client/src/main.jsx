// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext"; // <-- NEW
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          {" "}
          {/* <-- WRAP App with ToastProvider */}
          <App />
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
