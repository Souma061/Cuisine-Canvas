import cuisineLogo from "../assets/Cuisine.png";
import "./Header.css";

const Header = ({ cartItemCount, onCartClick, theme, onThemeToggle }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img src={cuisineLogo} alt="Cuisine Canvas Logo" className="logo" />
          <div className="brand-info">
            <h1 className="brand-name">Cuisine Canvas</h1>
            <p className="brand-tagline">Explore Culinary Masterpieces</p>
          </div>
        </div>
        <div className="header-tagline">
          <p>Discover exquisite flavors crafted with passion</p>
        </div>
        <button
          className="theme-toggle-btn"
          onClick={onThemeToggle}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <button
          className="cart-button"
          onClick={onCartClick}
          title="Open shopping cart"
        >
          <span className="cart-icon">🛒</span>
          <span className="cart-label">Cart</span>
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
