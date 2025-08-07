// pages/Home/Home.jsx
import './Home.css'
function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our Store</h1>
      <p>Discover amazing products at great prices!</p>
      <div className="featured-products">
        <div className="product-card">
          <img 
            src="https://portdesigns.com/6315-large_default/backpack-houston-eco-156.jpg" 
            alt="Fjallraven Backpack" 
          />
          <h3>Fjallraven Backpack</h3>
          <p>$109.95</p>
        </div>
        <div className="product-card">
          <img 
            src="https://fabrilife.com/products/6465ff10c1757-square.jpg?v=20" 
            alt="Mens Casual T-Shirt" 
          />
          <h3>Mens Casual T-Shirt</h3>
          <p>$22.99</p>
        </div>
      </div>
    </div>
  );
}

export default Home;