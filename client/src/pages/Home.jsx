// client/src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Group products by Gender + Category
  const getCategoryProducts = (gender, category) => {
    return products
      .filter((p) => p.gender === gender && p.category === category)
      .slice(0, 4);
  };

  // Define the sections we want to show on the homepage
  const sections = [
    { gender: "Women", category: "Gowns", label: "Evening Gowns" },
    { gender: "Women", category: "Two-Piece", label: "Two-Piece Sets" },
    { gender: "Men", category: "Senator", label: "Senator Suits" },
    { gender: "Men", category: "Kaftan", label: "Luxury Kaftans" },
  ];

  if (loading) {
    return (
      <div className="pt-40 flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section (Unchanged) */}
      <section className="relative h-[90vh] flex items-center justify-center bg-luxury-black text-luxury-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600')] bg-cover bg-center opacity-40" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-sm tracking-[0.3em] uppercase text-luxury-gold font-sans font-light">
            Spring / Summer 2026
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mt-4">
            The Art of <br className="hidden md:block" />
            <span className="italic text-luxury-gold">Silhouette</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light text-luxury-gray max-w-xl mx-auto">
            Where architectural precision meets draped fluidity. Discover the
            new collection.
          </p>
          <Link to="/shop">
            <button className="mt-10 px-10 py-4 border-2 border-luxury-white text-sm tracking-[0.2em] uppercase hover:bg-luxury-white hover:text-luxury-black transition duration-500 font-sans font-medium">
              Explore Collection
            </button>
          </Link>
        </div>
      </section>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {sections.map((section) => {
          const items = getCategoryProducts(section.gender, section.category);
          if (items.length === 0) return null;

          return (
            <section key={`${section.gender}-${section.category}`}>
              <div className="flex items-end justify-between border-b border-luxury-cream pb-4 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-light tracking-wide">
                    {section.label}
                  </h2>
                  <p className="text-sm text-luxury-gray font-light tracking-wider uppercase mt-1">
                    {section.gender} · {items.length} pieces
                  </p>
                </div>
                <Link
                  to={`/shop?gender=${section.gender}&category=${section.category}`}
                  className="text-xs tracking-[0.2em] uppercase font-sans font-medium hover:text-luxury-gold transition border-b border-transparent hover:border-luxury-gold pb-1"
                >
                  See More →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
