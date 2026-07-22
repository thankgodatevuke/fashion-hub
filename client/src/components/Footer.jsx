// client/src/components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-luxury-white/80 border-t border-luxury-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-serif text-2xl text-luxury-white tracking-widest">
            ÉLYSÉE
          </h3>
          <p className="text-sm font-light mt-3 leading-relaxed max-w-xs">
            Where architectural precision meets draped fluidity. Redefining
            modern luxury.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-luxury-white mb-4">
            COMPANY
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link to="/" className="hover:text-luxury-gold transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-luxury-gold transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-luxury-gold transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-luxury-gold transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-luxury-white mb-4">
            Women
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link
                to="/shop?gender=Women&category=Gowns"
                className="hover:text-luxury-gold transition"
              >
                Gowns
              </Link>
            </li>
            <li>
              <Link
                to="/shop?gender=Women&category=Two-Piece"
                className="hover:text-luxury-gold transition"
              >
                Two-Piece
              </Link>
            </li>
            <li>
              <Link
                to="/shop?gender=Women&category=Corporate"
                className="hover:text-luxury-gold transition"
              >
                Corporate
              </Link>
            </li>
            <li>
              <Link
                to="/shop?gender=Women&category=Corset"
                className="hover:text-luxury-gold transition"
              >
                Corset
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-luxury-white mb-4">
            Men
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link
                to="/shop?gender=Men&category=Kaftan"
                className="hover:text-luxury-gold transition"
              >
                Kaftan
              </Link>
            </li>
            <li>
              <Link
                to="/shop?gender=Men&category=Senator"
                className="hover:text-luxury-gold transition"
              >
                Senator
              </Link>
            </li>
            <li>
              <Link
                to="/shop?gender=Men&category=Two-Piece"
                className="hover:text-luxury-gold transition"
              >
                Two-Piece
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-luxury-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm font-light">
            <li>
              <Link to="/legal" className="hover:text-luxury-gold transition">
                Privacy & Policy
              </Link>
            </li>
            <li>
              <Link to="/legal" className="hover:text-luxury-gold transition">
                Returns & <span className="font-bold">Refunds</span>
              </Link>
            </li>
            <li>
              <Link to="/legal" className="hover:text-luxury-gold transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/legal" className="hover:text-luxury-gold transition">
                F.A.Q
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-luxury-white/10 text-center py-6 text-xs font-light text-luxury-gray">
        © 2026 ÉLYSÉE. All rights reserved. Crafted with precision.
      </div>
    </footer>
  );
};

export default Footer;
