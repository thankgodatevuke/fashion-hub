// client/src/components/SearchBar.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 300);

  // Fetch products once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Search failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on query
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const searchTerm = debouncedQuery.toLowerCase().trim();
    return products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const categoryMatch = product.category.toLowerCase().includes(searchTerm);
      const genderMatch =
        product.gender?.toLowerCase().includes(searchTerm) || false;
      return nameMatch || categoryMatch || genderMatch;
    });
  }, [debouncedQuery, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    // If we have results and user is navigating with arrows
    if (isOpen && results.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        return;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
        return;
      } else if (e.key === "Enter") {
        e.preventDefault();

        // If a specific result is highlighted (arrow keys), go to that product
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          navigate(`/product/${results[selectedIndex].id}`);
          resetSearch();
          return;
        }

        // If NO result is selected, treat it as a "search all" action
        if (query.trim()) {
          navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
          resetSearch();
          return;
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        setQuery("");
      }
    } else if (e.key === "Enter" && query.trim()) {
      // If dropdown is closed (no results found) but user presses Enter
      e.preventDefault();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      resetSearch();
    }
  };

  const resetSearch = () => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    if (query.trim()) setIsOpen(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex-1 max-w-md mx-4">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search for pieces..."
          className="w-full bg-luxury-cream/50 border border-luxury-cream rounded-full py-2 pl-10 pr-10 text-sm text-luxury-black placeholder:text-luxury-gray/60 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition duration-300"
          aria-label="Search for products"
        />
        {/* Search Icon */}
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray"
          size={18}
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              setSelectedIndex(-1);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-gray hover:text-luxury-black transition"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-luxury-cream max-h-80 overflow-y-auto z-50 backdrop-blur-sm"
        >
          <ul className="py-2 divide-y divide-luxury-cream">
            {results.map((product, index) => (
              <li
                key={product.id}
                className={`px-4 py-3 hover:bg-luxury-cream/50 transition cursor-pointer flex items-center gap-4 ${
                  selectedIndex === index ? "bg-luxury-cream/50" : ""
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  resetSearch();
                }}
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md bg-luxury-cream flex-shrink-0"
                  loading="lazy"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/48x48/e0e0e0/0A0A0A?text=É")
                  }
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-luxury-black truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-luxury-gray font-light">
                    {product.category} · ${product.price}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-luxury-gray font-sans font-light">
                  {product.gender}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results Message */}
      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-luxury-cream p-6 text-center z-50">
          <p className="text-sm text-luxury-gray font-light">
            No pieces found for{" "}
            <span className="font-medium text-luxury-black">"{query}"</span>
          </p>
          <p className="text-xs text-luxury-gray/60 mt-1">
            Try a different keyword or explore our collection
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
