// client/src/App.jsx
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout"; // <-- NEW
import OrderConfirmation from "./pages/OrderConfirmation"; // <-- NEW
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

//admin import
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductForm from "./pages/AdminProductForm";

function App() {
  return (
    <div className="min-h-screen bg-luxury-white">
      <Navbar />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} /> {/* <-- NEW */}
          <Route
            path="/order-confirmation"
            element={<OrderConfirmation />}
          />{" "}
          {/* <-- NEW */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          //admin Routes
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route
            path="/admin/products/:id/edit"
            element={<AdminProductForm />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
