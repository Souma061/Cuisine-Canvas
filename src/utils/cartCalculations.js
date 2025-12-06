
export const generateCartItemId = (menuItemId, customizationSelections = {}) => {
  const customizationString = JSON.stringify(customizationSelections);
  return `${menuItemId}_${customizationString}`;
};


export const calculateUnitPrice = (basePrice, customizationSelections = {}, menuItem) => {
  let unitPrice = basePrice;

  if (!menuItem.customizations || menuItem.customizations.length === 0) {
    return unitPrice;
  }

  // Add addon costs
  menuItem.customizations.forEach((customization) => {
    if (customization.type === 'addon' && customizationSelections[customization.id]) {
      unitPrice += customization.price;
    }
  });

  
  menuItem.customizations.forEach((customization) => {
    if (customization.type === 'select' && customizationSelections[customization.id]) {
      const selectedOption = customization.options.find(
        (opt) => opt.label === customizationSelections[customization.id]
      );
      if (selectedOption) {
        unitPrice += selectedOption.price;
      }
    }
  });

  return unitPrice;
};

export const calculateCustomizationCost = (customizationSelections = {}, menuItem) => {
  let customizationCost = 0;

  if (!menuItem.customizations || menuItem.customizations.length === 0) {
    return customizationCost;
  }

  menuItem.customizations.forEach((customization) => {
    if (customization.type === 'addon' && customizationSelections[customization.id]) {
      customizationCost += customization.price;
    }
  });

  menuItem.customizations.forEach((customization) => {
    if (customization.type === 'select' && customizationSelections[customization.id]) {
      const selectedOption = customization.options.find(
        (opt) => opt.label === customizationSelections[customization.id]
      );
      if (selectedOption) {
        customizationCost += selectedOption.price;
      }
    }
  });

  return customizationCost;
};


export const formatCustomizationDisplay = (customizationSelections = {}, menuItem) => {
  if (!menuItem.customizations || menuItem.customizations.length === 0 || Object.keys(customizationSelections).length === 0) {
    return '';
  }

  const parts = [];

  menuItem.customizations.forEach((customization) => {
    const selectedValue = customizationSelections[customization.id];
    if (!selectedValue) return;

    if (customization.type === 'select') {
      parts.push(selectedValue);
    } else if (customization.type === 'addon') {
      parts.push(`${selectedValue} (+₹${customization.price})`);
    }
  });

  return parts.length > 0 ? `— ${parts.join(', ')}` : '';
};

export const createCartItem = (menuItem, customizationSelections = {}, quantity = 1) => {
  const unitPrice = calculateUnitPrice(menuItem.price, customizationSelections, menuItem);
  const cartItemId = generateCartItemId(menuItem.id, customizationSelections);
  const lineItemPrice = unitPrice * quantity;

  return {
    cartItemId,
    menuItemId: menuItem.id,
    name: menuItem.name,
    basePrice: menuItem.price,
    unitPrice,
    quantity,
    lineItemPrice,
    customizationSelections,
    customizationDisplay: formatCustomizationDisplay(customizationSelections, menuItem),
    image: menuItem.image,
    description: menuItem.description,
    category: menuItem.category,
  };
};


export const addToCartOptimized = (cartItems, menuItem, customizationSelections = {}, quantity = 1) => {
  const cartItemId = generateCartItemId(menuItem.id, customizationSelections);

  // Check if item already exists in cart with same customizations
  const existingItemIndex = cartItems.findIndex((item) => item.cartItemId === cartItemId);

  if (existingItemIndex !== -1) {
    // Item exists, increase quantity
    const updatedItems = [...cartItems];
    updatedItems[existingItemIndex].quantity += quantity;
    updatedItems[existingItemIndex].lineItemPrice =
      updatedItems[existingItemIndex].unitPrice * updatedItems[existingItemIndex].quantity;
    return updatedItems;
  }

  // New item, add to cart
  const newCartItem = createCartItem(menuItem, customizationSelections, quantity);
  return [...cartItems, newCartItem];
};

/**
 * Remove item from cart by cartItemId
 */
export const removeFromCart = (cartItems, cartItemId) => {
  return cartItems.filter((item) => item.cartItemId !== cartItemId);
};

/**
 * Update quantity for a cart item
 */
export const updateCartItemQuantity = (cartItems, cartItemId, newQuantity) => {
  return cartItems.map((item) => {
    if (item.cartItemId === cartItemId) {
      return {
        ...item,
        quantity: newQuantity,
        lineItemPrice: item.unitPrice * newQuantity,
      };
    }
    return item;
  });
};

/**
 * Calculate subtotal from all cart items
 */
export const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.lineItemPrice, 0);
};

/**
 * Calculate tax on subtotal
 */
export const calculateTax = (subtotal, taxRate = 0.05) => {
  return Math.round(subtotal * taxRate * 100) / 100;
};

/**
 * Calculate grand total
 */
export const calculateGrandTotal = (subtotal, tax) => {
  return Math.round((subtotal + tax) * 100) / 100;
};

/**
 * Calculate all totals at once
 */
export const calculateCartTotals = (cartItems, taxRate = 0.05) => {
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateGrandTotal(subtotal, tax);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

/**
 * Find a cart item by ID
 */
export const findCartItem = (cartItems, cartItemId) => {
  return cartItems.find((item) => item.cartItemId === cartItemId);
};

/**
 * Get total number of items in cart (by quantity)
 */
export const getCartItemCount = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Group cart items by category for display
 */
export const groupCartByCategory = (cartItems) => {
  return cartItems.reduce((grouped, item) => {
    const category = item.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(item);
    return grouped;
  }, {});
};
