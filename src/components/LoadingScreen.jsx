import { useEffect, useState } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen({ onLoadComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load time
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadComplete?.();
    }, 2500); // Show loading for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-logo">
          <span className="logo-text">🍽️</span>
        </div>
        <h1 className="loading-title">Cuisine Canvas</h1>
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <p className="loading-text">Preparing your feast...</p>
      </div>
    </div>
  );
}
