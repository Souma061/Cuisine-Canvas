import React, { createContext, useContext } from 'react';
import useCart from '../hooks/useCart';

// Create Cart Context
const CartContext = createContext();

/**
 * Cart Provider Component
 * Wraps the app and provides cart state to all child components
 */
export const CartProvider = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to use Cart Context
 * Use this in any component to access cart functionality
 */
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};

export default CartContext;
