import "./MenuItem.css";

/**
 * MenuCard Component
 * Displays a single menu item card with image, details, and Add button
 */
const MenuCard = ({ item, onAddClick }) => {
  return (
    <div className="menu-item-card">
      {/* Image and Badges */}
      <div className="item-image-container">
        <img src={item.image} alt={item.name} className="item-image" />
        <div className="item-badges">
          {item.isVegetarian ? (
            <span className="badge vegetarian">🌱 Veg</span>
          ) : (
            <span className="badge non-veg">🍗 Non-Veg</span>
          )}
          <span className="badge rating">⭐ {item.rating}</span>
        </div>
      </div>

      {/* Item Info */}
      <div className="item-content">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>

        {/* Meta Info */}
        <div className="item-meta">
          <span className="prep-time">⏱️ {item.prepTime} min</span>
          {item.tags && item.tags.length > 0 && (
            <div className="item-tags">
              {item.tags.map((tag, idx) => (
                <span key={idx} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price and Button */}
        <div className="item-footer">
          <div className="price-section">
            <span className="currency">₹</span>
            <span className="price">{item.price}</span>
          </div>
          <button className="btn-add" onClick={() => onAddClick(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
