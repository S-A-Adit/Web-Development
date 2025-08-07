// pages/Shop/Shop.jsx
import { useEffect, useState } from 'react';
import ProductList from '../../components/Product/ProductList';
import { getProducts } from '../../services/products';
import PropTypes from 'prop-types';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

// Shop.jsx
if (loading) return <div className="loading">Loading...</div>;
if (error) return <div className="error">Error: {error}</div>;
Shop.propTypes = {
  // Add prop types if this component receives any props
};
  return (
    <div className="shop">
      <h1>Our Products</h1>
      <ProductList products={products} />
    </div>
  );
}

export default Shop;