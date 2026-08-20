// client/src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { Package, ShoppingBag, AlertTriangle, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if admin is logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem("elysee-admin");
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders`),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      showToast("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("elysee-admin");
    showToast("Logged out successfully");
    navigate("/admin/login");
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/products/${productId}`,
      );
      setProducts(products.filter((p) => p.id !== productId));
      showToast("Product deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      showToast("Failed to delete product");
    }
  };

  const lowStockProducts = products.filter((p) => p.stock < 5);

  if (loading) {
    return (
      <div className="pt-40 flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-luxury-cream pb-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-light">
            Admin <span className="font-bold">Dashboard</span>
          </h1>
          <p className="text-sm text-luxury-gray font-light mt-1">
            Manage your store
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-luxury-gray hover:text-luxury-black transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-luxury-cream p-6">
          <div className="flex items-center gap-3">
            <Package size={24} className="text-luxury-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray font-sans font-semibold">
                Total Products
              </p>
              <p className="text-2xl font-serif font-bold">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-luxury-cream p-6">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} className="text-luxury-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray font-sans font-semibold">
                Total Orders
              </p>
              <p className="text-2xl font-serif font-bold">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-luxury-cream p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle
              size={24}
              className={
                lowStockProducts.length > 0
                  ? "text-red-500"
                  : "text-luxury-gold"
              }
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gray font-sans font-semibold">
                Low Stock
              </p>
              <p className="text-2xl font-serif font-bold">
                {lowStockProducts.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Management */}
      <div className="border-t border-luxury-cream pt-8 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-light">Products</h2>
          <Link to="/admin/products/new">
            <button className="px-6 py-2 bg-luxury-black text-luxury-white text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-luxury-charcoal transition">
              Add New Product
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-luxury-cream text-left">
                <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                  ID
                </th>
                <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                  Name
                </th>
                <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                  Price
                </th>
                <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                  Stock
                </th>
                <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-luxury-cream/50 hover:bg-luxury-cream/20 transition"
                >
                  <td className="py-3 font-sans text-luxury-gray">
                    #{product.id}
                  </td>
                  <td className="py-3 font-medium">{product.name}</td>
                  <td className="py-3 font-sans">${product.price}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 text-xs font-sans font-medium ${
                        product.stock === 0
                          ? "text-red-600 bg-red-50"
                          : product.stock < 5
                            ? "text-orange-600 bg-orange-50"
                            : "text-green-600 bg-green-50"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <button className="text-xs text-luxury-gold hover:underline">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders */}
      <div className="border-t border-luxury-cream pt-8">
        <h2 className="text-xl font-serif font-light mb-6">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-luxury-gray font-light">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-luxury-cream text-left">
                  <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                    Order
                  </th>
                  <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                    Customer
                  </th>
                  <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                    Total
                  </th>
                  <th className="py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-luxury-cream/50 hover:bg-luxury-cream/20 transition"
                  >
                    <td className="py-3 font-sans text-luxury-gray">
                      #{product.id}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        {/* === ADD THUMBNAIL === */}
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-sm bg-luxury-cream"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/40x40/e0e0e0/0A0A0A?text=É";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-luxury-cream rounded-sm flex items-center justify-center text-xs text-luxury-gray">
                            No image
                          </div>
                        )}
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 font-sans">${product.price}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 text-xs font-sans font-medium ${
                          product.stock === 0
                            ? "text-red-600 bg-red-50"
                            : product.stock < 5
                              ? "text-orange-600 bg-orange-50"
                              : "text-green-600 bg-green-50"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/products/${product.id}/edit`}>
                          <button className="text-xs text-luxury-gold hover:underline">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
