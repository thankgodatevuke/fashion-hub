// client/src/components/ProductCard.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { ShoppingBag, Eye, Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const size = product.sizes?.[0] || "One Size";
    const color = product.colors?.[0] || "Standard";
    addToCart(product, size, color);
    showToast(`Added ${product.name} to your bag`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/product/${product.id}`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
    if (!isLiked) {
      showToast(`Added ${product.name} to your wishlist`);
    } else {
      showToast(`Removed ${product.name} from wishlist`);
    }
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
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400/e0e0e0/0A0A0A?text=ÉLYSÉE";
          }}
        />

        {/* "New" Badge (Left) */}
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 bg-luxury-black text-luxury-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans font-medium">
            New
          </span>
        )}

        {/* "Sold Out" Badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-luxury-black/60 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-luxury-white text-sm tracking-[0.3em] uppercase font-sans font-bold border border-luxury-white/50 px-6 py-3">
              Sold Out
            </span>
          </div>
        )}

        {/* --- TOP RIGHT: Heart Icon (Wishlist) --- */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 z-30 bg-luxury-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition duration-300 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            className={
              isLiked
                ? "fill-luxury-gold text-luxury-gold"
                : "text-luxury-charcoal"
            }
          />
        </button>

        {/* --- TOP LEFT: View Details Icon (replacing the top-right Eye placement) --- */}
        {/* We move Eye to top left or keep it simple with the card click */}
        {/* Actually, since the whole card is clickable, let's keep the Eye on hover at bottom-right */}
        <button
          onClick={handleViewDetails}
          className="absolute top-4 left-4 z-10 bg-luxury-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-luxury-black hover:text-luxury-white hover:scale-105"
          aria-label="View Details"
        >
          <Eye size={18} />
        </button>

        {/* Add to Cart Button (Bottom Center) */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)] py-2.5 text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition duration-300 ${
            product.stock === 0
              ? "bg-luxury-gray/50 text-luxury-gray cursor-not-allowed"
              : "bg-luxury-black text-luxury-white hover:bg-luxury-charcoal opacity-0 group-hover:opacity-100"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
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
