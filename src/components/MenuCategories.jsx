import { useEffect, useRef, useState } from "react";
import MenuCard from "./MenuCard";
import "./MenuCategories.css";

/**
 * MenuCategories Component
 * Displays menu items grouped by category with filtering
 */
const MenuCategories = ({ menuItems, onAddItem }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryTabsRef = useRef(null);

  // Group items by category
  const groupedItems = menuItems.reduce((groups, item) => {
    const category = item.category || "Other";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  // Filter items based on search term
  const filteredGroups = Object.keys(groupedItems).reduce(
    (filtered, category) => {
      const filteredItems = groupedItems[category].filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
      return filtered;
    },
    {}
  );

  const filteredCategories = Object.keys(filteredGroups);

  // Default to first category if none active
  const displayCategory =
    activeCategory && filteredCategories.includes(activeCategory)
      ? activeCategory
      : filteredCategories[0];

  const itemsToDisplay = filteredGroups[displayCategory] || [];

  // Auto-scroll active category tab into view
  useEffect(() => {
    if (categoryTabsRef.current) {
      const activeTab = categoryTabsRef.current.querySelector(
        ".category-tab.active"
      );
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [displayCategory]);

  return (
    <div className="menu-categories">
      {/* Hero Section */}
      <div className="menu-hero">
        <div className="hero-content">
          <h2 className="hero-title">Explore Our Menu</h2>
          <div className="hero-underline"></div>
          <p className="hero-description">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with passion. Our mission is to satisfy your cravings and
            elevate your dining experience, one delicious meal at a time.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for dishes, cuisines, or flavors..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setActiveCategory(null); // Reset category on search
          }}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs-wrapper" ref={categoryTabsRef}>
        <div className="category-tabs">
          {filteredCategories.map((category) => (
            <button
              key={category}
              className={`category-tab ${
                displayCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="items-section">
        {itemsToDisplay.length > 0 ? (
          <>
            <h2 className="category-title">{displayCategory}</h2>
            <div className="items-grid">
              {itemsToDisplay.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddClick={() => onAddItem(item)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <p>No dishes found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCategories;
