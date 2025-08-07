import CartItem from '../../components/Cart/CartItem';
import { useCart } from '../../hooks/useCart'; 


function CartPage() {
  const { cartItems, cartTotal } = useCart();
  
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="cart-summary">
            <h3>Total: ${cartTotal.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;