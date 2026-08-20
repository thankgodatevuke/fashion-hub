// client/src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

// --- Helper function to load from localStorage (runs BEFORE the component mounts) ---
const loadWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem("elysee-wishlist");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure it's an array (safety check)
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Failed to parse wishlist from localStorage:", error);
  }
  return [];
};

export const WishlistProvider = ({ children }) => {
  // ✅ FIX: Initialize state directly from localStorage (no delay!)
  const [wishlistItems, setWishlistItems] = useState(loadWishlistFromStorage);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("elysee-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
