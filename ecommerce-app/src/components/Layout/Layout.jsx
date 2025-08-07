// components/Layout/Layout.jsx
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="app" data-testid="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;