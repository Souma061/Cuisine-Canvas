import "./CartItem.css";

/**
 * CartItem Component
 * Displays a single item in the shopping cart with quantity controls
 */
const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const handleQuantityChange = (delta) => {
    onQuantityChange(item.cartItemId, item.quantity + delta);
  };

  return (
    <div className="cart-item">
      {/* Item Image */}
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      {/* Item Details */}
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        {item.customizationDisplay && (
          <p className="customization-summary">{item.customizationDisplay}</p>
        )}
        <p className="unit-price">₹{item.unitPrice.toFixed(2)} each</p>
      </div>

      {/* Quantity Control */}
      <div className="cart-quantity-control">
        <button
          className="qty-btn minus"
          onClick={() => handleQuantityChange(-1)}
          title="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn plus"
          onClick={() => handleQuantityChange(1)}
          title="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Line Total */}
      <div className="cart-item-total">
        <span className="line-total">₹{item.lineItemPrice.toFixed(2)}</span>
      </div>

      {/* Remove Button */}
      <button
        className="btn-remove"
        onClick={() => onRemove(item.cartItemId)}
        title="Remove from cart"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;
