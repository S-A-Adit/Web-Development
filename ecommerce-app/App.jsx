import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import './App.css';


// App.jsx
import CartPage from './components/Cart/CartPage';

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}
export default App;