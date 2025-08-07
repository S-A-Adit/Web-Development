// components/Layout/Navbar.jsx
import { Link } from 'react-router-dom';
import CartIcon from '../Cart/CartIcon';
import './Navbar.css'


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
      </div>
        <CartIcon />
    </nav>
  );
}

export default Navbar;