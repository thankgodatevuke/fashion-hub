// client/src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded credentials (you can change these)
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "elysee2026";

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("elysee-admin", "true");
        showToast("Welcome back, Admin!");
        navigate("/admin/dashboard");
      } else {
        showToast("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream px-6">
      <div className="bg-white p-8 md:p-12 max-w-md w-full shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-light">ÉLYSÉE</h1>
          <p className="text-sm text-luxury-gray font-light mt-2">
            Admin Login
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-luxury-cream/40 border border-luxury-cream rounded-sm py-3 px-4 text-luxury-black focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-charcoal mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-luxury-cream/40 border border-luxury-cream rounded-sm py-3 px-4 text-luxury-black focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-luxury-black text-luxury-white text-sm tracking-[0.2em] uppercase font-sans font-medium hover:bg-luxury-charcoal transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-[10px] text-luxury-gray mt-6 font-sans">
          Default: admin / elysee2026
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
