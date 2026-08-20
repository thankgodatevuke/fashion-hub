// client/src/pages/Wishlist.jsx
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Heart, ShoppingBag, X } from "lucide-react";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <>
        <SEO
          title="Wishlist — Saved Items"
          description="Your saved items at ÉLYSÉE. Curate your favorite luxury fashion pieces."
          url="https://tgdev.com/wishlist"
        />
        <div className="pt-40 px-6 max-w-4xl mx-auto text-center pb-32">
          <Heart
            size={48}
            className="mx-auto text-luxury-gray mb-6"
            strokeWidth={1}
          />
          <h2 className="text-3xl font-serif font-light">
            Your wishlist is empty
          </h2>
          <p className="text-luxury-gray mt-3 font-light">
            Start saving the pieces you love.
          </p>
          <Link to="/shop">
            <button className="mt-8 px-10 py-3 border border-luxury-black text-sm tracking-[0.2em] uppercase hover:bg-luxury-black hover:text-luxury-white transition duration-300">
              Explore Collection
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Wishlist — Saved Items"
        description="Your saved items at ÉLYSÉE. Curate your favorite luxury fashion pieces."
        url="https://tgdev.com/wishlist"
      />
      <div className="pt-28 px-6 max-w-7xl mx-auto pb-20">
        <div className="flex items-center justify-between border-b border-luxury-cream pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-light">
            Wishlist
          </h1>
          <p className="text-sm text-luxury-gray uppercase tracking-wider font-sans font-light">
            {wishlistItems.length} saved items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {wishlistItems.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              {/* Remove button overlay */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute -top-2 -right-2 z-20 bg-luxury-black text-luxury-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition duration-300"
                aria-label="Remove from wishlist"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
