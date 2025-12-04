import CartItem from "./CartItem";
import "./CartModal.css";

/**
 * CartModal Component
 * Displays the shopping cart with all items, totals, and checkout option
 */
const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  tax,
  total,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const isEmpty = cartItems.length === 0;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items-container">
          {isEmpty ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add items from the menu to get started</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartItemId}
                  item={item}
                  onRemove={onRemoveItem}
                  onQuantityChange={onUpdateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Totals and Actions */}
        {!isEmpty && (
          <>
            {/* Totals */}
            <div className="cart-totals">
              <div className="total-row">
                <span className="label">Subtotal</span>
                <span className="value">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span className="label">Tax (5%)</span>
                <span className="value">₹{tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span className="label">Grand Total</span>
                <span className="value">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="cart-actions">
              <button className="btn-continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
              <button className="btn-checkout" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

        {/* Empty Cart Action */}
        {isEmpty && (
          <div className="empty-cart-action">
            <button className="btn-continue-shopping full" onClick={onClose}>
              Return to Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
