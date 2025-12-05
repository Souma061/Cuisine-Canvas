import { useState } from "react";
import {
  calculateCustomizationCost,
  calculateUnitPrice,
  formatCustomizationDisplay,
} from "../utils/cartCalculations";
import "./CustomizationModal.css";

/**
 * CustomizationModal Component
 * Displays customization options before adding item to cart
 * Handles select/addon type customizations with real-time price calculations
 */
const CustomizationModal = ({ menuItem, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({});

  const handleCustomizationChange = (customizationId, value) => {
    setCustomizations({
      ...customizations,
      [customizationId]: value,
    });
  };

  const handleToggleAddon = (customizationId) => {
    if (customizations[customizationId]) {
      // Remove addon
      const newCustomizations = { ...customizations };
      delete newCustomizations[customizationId];
      setCustomizations(newCustomizations);
    } else {
      // Add addon
      setCustomizations({
        ...customizations,
        [customizationId]: true, // Just mark as selected
      });
    }
  };

  const unitPrice = calculateUnitPrice(
    menuItem.price,
    customizations,
    menuItem
  );
  const customizationCost = calculateCustomizationCost(
    customizations,
    menuItem
  );
  const lineTotal = unitPrice * quantity;
  const customizationDisplay = formatCustomizationDisplay(
    customizations,
    menuItem
  );

  const handleAdd = () => {
    onAddToCart(menuItem, customizations, quantity);
    onClose();
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="customization-modal-overlay" onClick={onClose}>
      <div className="customization-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="modal-image"
            loading="lazy"
          />
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Item Info */}
        <div className="modal-item-info">
          <h2>{menuItem.name}</h2>
          <p className="description">{menuItem.description}</p>

          {/* Show customization cost breakdown */}
          {Object.keys(customizations).length > 0 && customizationCost > 0 && (
            <div className="customization-cost-info">
              Customization Cost: +₹{customizationCost.toFixed(2)}
            </div>
          )}

          {customizationDisplay && (
            <p className="customization-preview">{customizationDisplay}</p>
          )}
        </div>

        {/* Customizations */}
        {menuItem.customizations && menuItem.customizations.length > 0 && (
          <div className="customizations-section">
            <h3>Customize Your Order</h3>
            {menuItem.customizations.map((customization) => (
              <div key={customization.id} className="customization-group">
                {customization.type === "select" && (
                  <div>
                    <label className="customization-label">
                      {customization.name}
                    </label>
                    <div className="select-options">
                      {customization.options.map((option) => (
                        <label key={option.label} className="option-label">
                          <input
                            type="radio"
                            name={`customization-${customization.id}`}
                            value={option.label}
                            checked={
                              customizations[customization.id] === option.label
                            }
                            onChange={(e) =>
                              handleCustomizationChange(
                                customization.id,
                                e.target.value
                              )
                            }
                          />
                          <span className="option-text">
                            {option.label}
                            {option.price > 0 && (
                              <span className="price"> +₹{option.price}</span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {customization.type === "addon" && (
                  <label className="addon-label">
                    <input
                      type="checkbox"
                      checked={!!customizations[customization.id]}
                      onChange={() => handleToggleAddon(customization.id)}
                    />
                    <span className="addon-text">
                      {customization.name}
                      <span className="price"> +₹{customization.price}</span>
                    </span>
                  </label>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Quantity and Pricing */}
        <div className="modal-footer">
          <div className="quantity-section">
            <label>Quantity</label>
            <div className="quantity-control">
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="pricing-section">
            <div className="price-row">
              <span>Unit Price:</span>
              <span className="price-value">₹{unitPrice.toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total:</span>
              <span className="price-value">₹{lineTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-add-to-cart" onClick={handleAdd}>
            Add to Cart - ₹{lineTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
