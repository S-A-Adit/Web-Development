// components/Product/ProductCard.jsx
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import Button from '../UI/Button';
import Input from '../UI/Input';
import './ProductCard.css';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleChange = e => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="product-card">
      // In ProductCard.jsx, change the img element to:
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-image" 
        loading="lazy"
      />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="quantity-controls">
        <Button onClick={handleDecrement}>-</Button>
        <Input 
          type="number" 
          value={quantity} 
          onChange={handleChange} 
          min="1"
        />
        <Button onClick={handleIncrement}>+</Button>
      </div>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
}

export default ProductCard;