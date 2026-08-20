// client/src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { isVideoUrl } from "../utils/mediaUtils.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/SEO"; // <-- Import SEO (MUST be at the top)
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const isLiked = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        );
        setProduct(response.data);
        setCurrentIndex(0);
        setSelectedSize(response.data.sizes[0] || "");
        setSelectedColor(response.data.colors[0] || "");
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // --- Navigation Handlers ---
  const handlePrev = () => {
    if (!product) return;
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    if (!product) return;
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      showToast("Please select a size and color");
      return;
    }

    if (product.stock <= 0) {
      showToast("Sorry, this item is out of stock.");
      return;
    }

    addToCart(product, selectedSize, selectedColor);

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/products/${product.id}/stock`,
        {
          quantity: 1,
        },
      );
      setProduct((prev) => ({ ...prev, stock: prev.stock - 1 }));
      showToast(`Added ${product.name} to your bag`);
    } catch (error) {
      console.error("Stock update failed:", error);
      showToast("Stock update failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="pt-40 flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center pb-32">
        <h2 className="text-3xl font-serif font-light">Product Not Found</h2>
        <p className="text-luxury-gray mt-3 font-light">
          The piece you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/shop">
          <button className="mt-8 px-10 py-3 border border-luxury-black text-sm tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  // --- Derive current media from index ---
  const mainMedia = product.images[currentIndex];
  const totalMedia = product.images.length;

  // --- Helper to render the main media (Image or Video) ---
  const renderMainMedia = () => {
    if (isVideoUrl(mainMedia)) {
      return (
        <video
          src={mainMedia}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[500px] md:h-[700px] object-cover object-center"
        />
      );
    }
    return (
      <img
        src={mainMedia} // <-- FIXED: Changed from 'currentMedia' to 'mainMedia'
        alt={product.name}
        loading="lazy"
        className="w-full h-[500px] md:h-[700px] object-cover object-center"
      />
    );
  };

  // --- Helper to render thumbnail (Image or Video) ---
  const renderThumbnail = (media, index) => {
    if (isVideoUrl(media)) {
      return (
        <video
          src={media}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <img
        src={media}
        alt={`Thumbnail ${index}`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <>
      {/* ✅ SEO COMPONENT - NOW IN THE CORRECT LOCATION (inside return) */}
      <SEO
        title={`${product.name} — Luxury Fashion`}
        description={product.description.substring(0, 160)}
        image={
          product.images?.[0] ||
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200"
        }
        url={`https://tgdev.com/product/${product.id}`}
        type="product"
      />

      <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto pb-20 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* LEFT: Main Media + Thumbnail Gallery */}
          <div>
            <div className="relative overflow-hidden bg-luxury-cream group">
              {renderMainMedia()}

              <span className="absolute bottom-4 left-4 z-10 bg-luxury-black/70 text-luxury-white text-[10px] tracking-[0.2em] px-3 py-1 font-sans font-medium rounded-full backdrop-blur-sm">
                {currentIndex + 1} / {totalMedia}
              </span>

              {totalMedia > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-luxury-white/80 backdrop-blur-sm hover:bg-luxury-white text-luxury-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-105"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {totalMedia > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-luxury-white/80 backdrop-blur-sm hover:bg-luxury-white text-luxury-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-105"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              {product.images.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-20 h-20 overflow-hidden border-2 transition flex-shrink-0 ${
                    currentIndex === index
                      ? "border-luxury-black"
                      : "border-transparent"
                  }`}
                >
                  {renderThumbnail(media, index)}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col justify-start pt-4">
            <p className="text-sm text-luxury-gray uppercase tracking-[0.25em] font-sans font-light">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 leading-tight">
              {product.name}
            </h1>

            <p className="text-2xl font-sans font-semibold mt-4">
              ${product.price}
            </p>

            <div className="mt-2 flex items-center gap-2">
              {product.stock > 0 ? (
                <span className="text-xs font-sans text-green-700 font-medium tracking-wide">
                  In Stock · {product.stock}{" "}
                  {product.stock === 1 ? "piece" : "pieces"} remaining
                </span>
              ) : (
                <span className="text-xs font-sans text-red-600 font-medium tracking-wide uppercase">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="border-t border-luxury-cream my-6 pt-6">
              <p className="text-luxury-charcoal font-light leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold mb-2">
                Color: <span className="font-light">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-sans font-medium border transition ${
                      selectedColor === color
                        ? "bg-luxury-black text-luxury-white border-luxury-black"
                        : "border-luxury-cream hover:border-luxury-gray"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold mb-2">
                Size: <span className="font-light">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 text-sm font-sans border transition ${
                      selectedSize === size
                        ? "bg-luxury-black text-luxury-white border-luxury-black"
                        : "border-luxury-cream hover:border-luxury-gray"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`mt-8 w-full py-4 text-sm tracking-[0.2em] uppercase font-sans font-medium transition duration-300 ${
                product.stock === 0
                  ? "bg-luxury-gray/30 text-luxury-gray cursor-not-allowed"
                  : "bg-luxury-black text-luxury-white hover:bg-luxury-charcoal"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                toggleWishlist(product);
                if (!isLiked) {
                  showToast(`Added ${product.name} to your wishlist`);
                } else {
                  showToast(`Removed ${product.name} from wishlist`);
                }
              }}
              className={`mt-4 w-full py-3 text-sm tracking-[0.2em] uppercase font-sans font-medium border transition duration-300 flex items-center justify-center gap-2 ${
                isLiked
                  ? "bg-luxury-gold text-white border-luxury-gold"
                  : "bg-transparent text-luxury-black border-luxury-cream hover:border-luxury-black"
              }`}
            >
              <Heart size={18} className={isLiked ? "fill-white" : ""} />
              {isLiked ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="mt-6 text-xs text-luxury-gray uppercase tracking-[0.2em] font-sans hover:text-luxury-black transition"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
