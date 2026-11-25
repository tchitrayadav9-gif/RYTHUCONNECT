/**
 * Shopping Cart Context (Customer Cart State)
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rythu_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('rythu_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === (product._id || product.id));
      if (existing) {
        return prev.map((item) =>
          item.productId === (product._id || product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            productId: product._id || product.id,
            farmerId: product.farmerId || (product.farmer && product.farmer.id) || 'farmer_001',
            name: product.name,
            pricePerUnit: product.pricePerUnit,
            unit: product.unit || 'KG',
            image: (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
            farmerName: (product.farmer && product.farmer.name) || 'Ramesh Naidu',
            quantity
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? (cartSubtotal > 500 ? 0 : 40) : 0;
  const platformFee = cartItems.length > 0 ? 5 : 0;
  const totalAmount = cartSubtotal + deliveryFee + platformFee;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        deliveryFee,
        platformFee,
        totalAmount,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
