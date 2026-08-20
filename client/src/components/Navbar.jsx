// client/src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const cartCount = getCartCount();
  const { getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();

  const navLinks = [
    { name: "Home", path: "/" },
    //{ name: "Shop", path: "/shop" },
    { name: "Men", path: "/shop?gender=Men" },
    { name: "Women", path: "/shop?gender=Women" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-white/95 backdrop-blur-sm border-b border-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo (Left) - stays pinned to the left */}
        <Link
          to="/"
          className="font-serif text-2xl tracking-widest uppercase hover:text-luxury-gold transition duration-300 flex-shrink-0"
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

        {/* Right Group (Search + Cart + Toggles) - stays pinned to the right */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Desktop Search Bar (Hidden on mobile) */}
          <div className="hidden md:block">
            <div className="w-48 lg:w-64">
              <SearchBar />
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 hover:text-luxury-gold transition"
            aria-label="Toggle search"
          >
            <Search size={22} />
          </button>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative p-2 hover:text-luxury-gold transition"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-gold text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
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

      {/* Mobile Search Bar (visible when toggled) */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-luxury-cream px-4 py-3 bg-luxury-white">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
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
