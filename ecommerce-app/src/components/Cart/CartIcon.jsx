// components/Cart/CartIcon.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

function CartIcon() {
  const { cartItemCount } = useCart();

  return (
    <Link to="/cart" className="cart-icon" aria-label={`Cart (${cartItemCount} items)`}>
      🛒
      {cartItemCount > 0 && (
        <span className="cart-count" aria-hidden="true">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;