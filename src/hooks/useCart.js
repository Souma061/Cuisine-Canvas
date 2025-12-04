import { useCallback, useEffect, useState } from 'react';
import { addToCartOptimized, calculateCartTotals, removeFromCart, updateCartItemQuantity } from '../utils/cartCalculations';
import useLocalStorage from './useLocalStorage';

/**
 * Custom hook for managing shopping cart with persistence
 * Handles add, remove, update, and complex calculations
 */
const useCart = () => {
  const [cartItems, setCartItems] = useLocalStorage('cart_items', []);
  const [taxRate] = useState(0.05); // 5% tax
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate totals whenever cart items change
  useEffect(() => {
    const { subtotal: newSubtotal, tax: newTax, total: newTotal } = calculateCartTotals(cartItems, taxRate);
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems, taxRate]);

  /**
   * Add item to cart with customizations
   * Intelligently groups items with same base item but different customizations
   */
  const addItem = useCallback((menuItem, selectedCustomizations = {}, quantity = 1) => {
    setCartItems((prevItems) => {
      return addToCartOptimized(prevItems, menuItem, selectedCustomizations, quantity);
    });
  }, [setCartItems]);

  /**
   * Remove item from cart by cartId
   */
  const removeItem = useCallback((cartItemId) => {
    setCartItems((prevItems) => {
      return removeFromCart(prevItems, cartItemId);
    });
  }, [setCartItems]);

  /**
   * Update quantity for a cart item
   */
  const updateQuantity = useCallback((cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setCartItems((prevItems) => {
      return updateCartItemQuantity(prevItems, cartItemId, newQuantity);
    });
  }, [setCartItems, removeItem]);

  /**
   * Clear entire cart
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  /**
   * Get cart item count
   */
  const getCartCount = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartCount,
    subtotal,
    tax,
    total,
    taxRate,
  };
};

export default useCart;
