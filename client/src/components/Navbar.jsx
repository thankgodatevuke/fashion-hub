// client/src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = getCartCount(); // Defaults to 0 automatically

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-white/95 backdrop-blur-sm border-b border-luxury-cream">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-2xl tracking-widest uppercase hover:text-luxury-gold transition duration-300"
        >
          ÉLYSÉE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase font-sans font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-luxury-gold transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Cart + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative p-2 hover:text-luxury-gold transition"
          >
            <ShoppingBag size={22} />
            <span className="absolute -top-1 -right-1 bg-luxury-black text-luxury-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:text-luxury-gold transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Sliding down) */}
      {isOpen && (
        <div className="md:hidden bg-luxury-white border-b border-luxury-cream px-6 py-6 shadow-lg">
          <nav className="flex flex-col space-y-5 text-sm tracking-widest uppercase font-sans font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-luxury-gold transition py-1 border-b border-luxury-cream/50"
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Category Quick Links */}
            <div className="pt-2 border-t border-luxury-black/10">
              <p className="text-[10px] text-luxury-gray tracking-[0.2em] mb-2">
                Women
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] font-light">
                <Link
                  to="/shop?gender=Women&category=Gowns"
                  onClick={() => setIsOpen(false)}
                >
                  Gowns
                </Link>
                <Link
                  to="/shop?gender=Women&category=Two-Piece"
                  onClick={() => setIsOpen(false)}
                >
                  Two-Piece
                </Link>
                <Link
                  to="/shop?gender=Women&category=Corporate"
                  onClick={() => setIsOpen(false)}
                >
                  Corporate
                </Link>
                <Link
                  to="/shop?gender=Women&category=Corset"
                  onClick={() => setIsOpen(false)}
                >
                  Corset
                </Link>
              </div>
              <p className="text-[10px] text-luxury-gray tracking-[0.2em] mt-3 mb-2">
                Men
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] font-light">
                <Link
                  to="/shop?gender=Men&category=Kaftan"
                  onClick={() => setIsOpen(false)}
                >
                  Kaftan
                </Link>
                <Link
                  to="/shop?gender=Men&category=Senator"
                  onClick={() => setIsOpen(false)}
                >
                  Senator
                </Link>
                <Link
                  to="/shop?gender=Men&category=Two-Piece"
                  onClick={() => setIsOpen(false)}
                >
                  Two-Piece
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
