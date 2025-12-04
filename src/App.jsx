import { useState } from "react";
import "./App.css";
import CartModal from "./components/CartModal";
import CustomizationModal from "./components/CustomizationModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import MenuCategories from "./components/MenuCategories";
import { CartProvider, useCartContext } from "./context/CartContext";
import menuData from "./data/menu.json";

/**
 * Main App Component
 * Orchestrates all components and manages app-level state
 */
function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const cart = useCartContext();

  const handleAddItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsCustomizationOpen(true);
  };

  const handleAddToCart = (menuItem, customizations, quantity) => {
    cart.addItem(menuItem, customizations, quantity);
    // Show a quick feedback (optional toast notification could go here)
    console.log(`Added ${quantity}x ${menuItem.name} to cart`);
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with ₹${cart.total.toFixed(2)} total`);
    // In a real app, this would navigate to a checkout page
  };

  return (
    <div className="app">
      {/* Header */}
      <Header
        cartItemCount={cart.getCartCount()}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="app-main">
        {menuData && menuData.data && (
          <MenuCategories menuItems={menuData.data} onAddItem={handleAddItem} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Customization Modal */}
      {isCustomizationOpen && selectedMenuItem && (
        <CustomizationModal
          menuItem={selectedMenuItem}
          onClose={() => {
            setIsCustomizationOpen(false);
            setSelectedMenuItem(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart.cartItems}
        subtotal={cart.subtotal}
        tax={cart.tax}
        total={cart.total}
        onRemoveItem={cart.removeItem}
        onUpdateQuantity={cart.updateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CartProvider>
      <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
      <AppContent />
    </CartProvider>
  );
}

export default App;
