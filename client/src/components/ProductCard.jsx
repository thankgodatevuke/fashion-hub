// client/src/components/ProductCard.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext"; // <-- NEW
import { ShoppingBag, Eye } from "lucide-react";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast(); // <-- NEW

  // --- Quick Add to Cart ---
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const size = product.sizes?.[0] || "One Size";
    const color = product.colors?.[0] || "Standard";

    addToCart(product, size, color);
    showToast("Added to cart"); // <-- REPLACE the silent add with Toast
  };

  // --- View Details ---
  const handleViewDetails = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/product/${product.id}`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-luxury-cream">
        {/* Product Image */}
        <img
          src={
            isHovered && product.images?.length > 1
              ? product.images[1]
              : product.images?.[0]
          }
          alt={product.name}
          className="w-full h-[400px] object-cover object-center transition duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400/e0e0e0/0A0A0A?text=ÉLYSÉE";
          }}
        />

        {/* "New" Badge */}
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 bg-luxury-black text-luxury-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans font-medium">
            New
          </span>
        )}

        {/* View Details Icon */}
        <button
          onClick={handleViewDetails}
          className="absolute top-4 right-4 z-10 bg-luxury-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-luxury-black hover:text-luxury-white hover:scale-105"
          aria-label="View Details"
        >
          <Eye size={18} />
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)] bg-luxury-black text-luxury-white py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans font-medium opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-luxury-charcoal flex items-center justify-center gap-2"
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-serif text-lg font-medium leading-tight group-hover:text-luxury-gold transition">
            {product.name}
          </h3>
          <p className="text-sm text-luxury-gray uppercase tracking-wider font-sans font-light mt-1">
            {product.category}
          </p>
        </div>
        <span className="font-sans text-sm font-semibold tracking-wide">
          ${product.price}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
