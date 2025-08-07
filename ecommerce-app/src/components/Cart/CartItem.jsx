// src/components/Cart/CartItem.jsx
import { useCart } from '../../hooks/useCart';
import { CartProvider } from '../../context/CartContext';
import Button from '../UI/Button';
import PropTypes from 'prop-types';

function CartItem({ item }) {
  const { removeFromCart, updateCartItem } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateCartItem(item.id, newQuantity);
    } else {
      removeFromCart(item.id);
    }
  };

  const incrementQuantity = () => handleQuantityChange(item.quantity + 1);
  const decrementQuantity = () => handleQuantityChange(item.quantity - 1);

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-quantity">
        <Button onClick={decrementQuantity}>-</Button>
        <span>{item.quantity}</span>
        <Button onClick={incrementQuantity}>+</Button>
      </div>
      <div className="cart-item-total">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="cart-item-remove">
        <Button onClick={handleRemove} variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;