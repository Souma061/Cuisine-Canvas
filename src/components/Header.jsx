import "./Header.css";

/**
 * Header Component
 * Top navigation bar with logo, branding, theme toggle, and cart button
 */
const Header = ({ cartItemCount, onCartClick, theme, onThemeToggle }) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo">🍽️</div>
          <div className="brand-info">
            <h1 className="brand-name">Cuisine Canvas</h1>
            <p className="brand-tagline">Explore Culinary Masterpieces</p>
          </div>
        </div>

        {/* Tagline Section */}
        <div className="header-tagline">
          <p>Discover exquisite flavors crafted with passion</p>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={onThemeToggle}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Cart Button */}
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
