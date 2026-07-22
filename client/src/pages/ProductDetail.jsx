// client/src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { isVideoUrl } from "../utils/mediaUtils.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image/video index
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        );
        setProduct(response.data);
        setCurrentIndex(0); // Reset to first image when product loads
        setSelectedSize(response.data.sizes[0] || "");
        setSelectedColor(response.data.colors[0] || "");
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/shop");
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

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      showToast("Please select a size and color");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    showToast(`Added ${product.name} to your bag`);
  };

  if (loading) {
    return (
      <div className="pt-40 flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

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
        src={mainMedia}
        alt={product.name}
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
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto pb-20 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* LEFT: Main Media + Thumbnail Gallery */}
        <div>
          {/* --- MAIN MEDIA WITH ARROWS (group for hover effect) --- */}
          <div className="relative overflow-hidden bg-luxury-cream group">
            {renderMainMedia()}

            {/* Image Counter (e.g., 2 / 4) */}
            <span className="absolute bottom-4 left-4 z-10 bg-luxury-black/70 text-luxury-white text-[10px] tracking-[0.2em] px-3 py-1 font-sans font-medium rounded-full backdrop-blur-sm">
              {currentIndex + 1} / {totalMedia}
            </span>

            {/* LEFT ARROW (only show if more than 1 image) */}
            {totalMedia > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-luxury-white/80 backdrop-blur-sm hover:bg-luxury-white text-luxury-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* RIGHT ARROW (only show if more than 1 image) */}
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

          {/* Thumbnail Strip */}
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

        {/* RIGHT: Product Info (UNCHANGED) */}
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

          <div className="border-t border-luxury-cream my-6 pt-6">
            <p className="text-luxury-charcoal font-light leading-relaxed text-base">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
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

          {/* Size Selector */}
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

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-luxury-black text-luxury-white py-4 text-sm tracking-[0.2em] uppercase font-sans font-medium hover:bg-luxury-charcoal transition duration-300"
          >
            Add to Bag
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
  );
};

export default ProductDetail;
