// src/context/CartContext.jsx
import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Create the CartContext object
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Calculate total number of items in cart
  const cartItemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Calculate total price of all items in cart
  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  // Add item to cart or increase quantity if it already exists
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  // Remove item from cart by ID
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Check if an item is already in the cart
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Update the quantity of an item in the cart
  const updateCartItem = (productId, newQuantity) => {
    const quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Type-checking for children prop
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { CartContext };