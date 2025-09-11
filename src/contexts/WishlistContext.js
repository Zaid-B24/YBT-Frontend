import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('ybt_wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ybt_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(wishlistItem => wishlistItem.id === item.id);
      if (!existingItem) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  const toggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 