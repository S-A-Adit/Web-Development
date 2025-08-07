// hooks/useCart.js
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  console.log('CartContext value:', context); 
  if (context === undefined) {  // More precise check
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};