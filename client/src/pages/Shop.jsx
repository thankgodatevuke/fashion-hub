// client/src/pages/Shop.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sort state (default: 'random')
  const [sortBy, setSortBy] = useState("random");

  // Get filters from the URL (e.g., ?gender=Women&category=Gowns)
  const currentGender = searchParams.get("gender") || "All";
  const currentCategory = searchParams.get("category") || "All";

  // Fetch products from backend (no sorting params, just raw data)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- 1. FILTER LOGIC (Filters by BOTH Gender AND Category) ---
  const filteredProducts = products.filter((product) => {
    const genderMatch =
      currentGender === "All" || product.gender === currentGender;
    const categoryMatch =
      currentCategory === "All" || product.category === currentCategory;
    return genderMatch && categoryMatch;
  });

  // --- 2. SORT LOGIC (Client-side, using useMemo for performance) ---
  const sortedProducts = useMemo(() => {
    // Create a copy of the filtered products to avoid mutating state
    let sorted = [...filteredProducts];

    if (sortBy === "random") {
      // Fisher-Yates shuffle for true randomness
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }
      return sorted;
    } else if (sortBy === "newest") {
      return sorted.sort((a, b) => b.id - a.id);
    } else if (sortBy === "oldest") {
      return sorted.sort((a, b) => a.id - b.id);
    } else if (sortBy === "price_asc") {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      return sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  // --- 3. DYNAMIC CATEGORY LIST (based on the selected gender) ---
  const availableCategories = [
    "All",
    ...new Set(
      products
        .filter((p) => currentGender === "All" || p.gender === currentGender)
        .map((p) => p.category),
    ),
  ];

  // --- 4. GENDER LIST ---
  const genders = ["All", "Men", "Women"];

  // --- 5. HANDLE FILTER CLICKS (Update URL) ---
  const handleGenderClick = (gender) => {
    setSearchParams({ gender, category: "All" });
  };

  const handleCategoryClick = (category) => {
    setSearchParams({ gender: currentGender, category });
  };

  // --- 6. LOADING STATE ---
  if (loading) {
    return (
      <div className="pt-40 flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto pb-20">
      {/* --- PAGE HEADER with SORT DROPDOWN --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-luxury-cream pb-6 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            The Collection
          </h1>
          <p className="text-luxury-gray font-light mt-2 text-sm tracking-wider uppercase">
            {sortedProducts.length} piece
            {sortedProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Sort Dropdown - Right Side */}
        <div className="mt-4 md:mt-0">
          <label className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray block mb-1 md:text-right">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto bg-luxury-white border border-luxury-cream rounded-none px-5 py-2 text-sm font-sans focus:outline-none focus:border-luxury-black transition"
          >
            <option value="random">Random</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* --- INLINE FILTER BAR (Desktop: Gender left, Category right) --- */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 mb-10 border-b border-luxury-cream pb-8">
        {/* Gender Filter (Left) */}
        <div className="w-full md:w-auto">
          <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray mb-2">
            Gender
          </span>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {genders.map((gender) => (
              <button
                key={gender}
                onClick={() => handleGenderClick(gender)}
                className={`px-5 md:px-6 py-2 text-xs tracking-[0.15em] uppercase font-sans font-medium transition duration-300 rounded-full border ${
                  currentGender === gender
                    ? "bg-luxury-black text-luxury-white border-luxury-black"
                    : "border-luxury-cream text-luxury-charcoal hover:border-luxury-gray"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter (Right) */}
        <div className="w-full md:w-auto md:text-right">
          <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-luxury-gray mb-2 md:text-right">
            Category
          </span>
          <div className="flex flex-wrap gap-2 md:gap-3 md:justify-end">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-5 md:px-6 py-2 text-xs tracking-[0.15em] uppercase font-sans font-medium transition duration-300 rounded-full border ${
                  currentCategory === category
                    ? "bg-luxury-black text-luxury-white border-luxury-black"
                    : "border-luxury-cream text-luxury-charcoal hover:border-luxury-gray"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID (Now using sortedProducts) --- */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-luxury-gray font-serif text-xl">
            No pieces found in this selection.
          </p>
          <button
            onClick={() => setSearchParams({ gender: "All", category: "All" })}
            className="mt-4 text-sm uppercase tracking-[0.2em] font-sans hover:text-luxury-gold transition border-b border-luxury-cream pb-1"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
