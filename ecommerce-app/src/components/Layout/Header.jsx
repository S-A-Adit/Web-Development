// src/components/Layout/Header.jsx
import PropTypes from 'prop-types';


/**
 * Header component that displays the site header/banner
 * Can include logo, tagline, or other header content
 */
function Header({ title, tagline, children }) {
  return (
    <header className="site-header">
      <div className="header-content">
        {title && <h1 className="header-title">{title}</h1>}
        {tagline && <p className="header-tagline">{tagline}</p>}
        {children}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  children: PropTypes.node,
};

Header.defaultProps = {
  title: 'My E-Commerce Store',
  tagline: 'Quality products at great prices',
};

export default Header;