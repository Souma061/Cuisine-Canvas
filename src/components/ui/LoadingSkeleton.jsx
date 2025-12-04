import "./LoadingSkeleton.css";

/**
 * LoadingSkeleton Component
 * Displays a shimmer skeleton loader for individual menu items
 * Used for progressive loading without full-screen overlay
 */
const LoadingSkeleton = () => {
  return (
    <div className="skeleton-card">
      {/* Skeleton Image */}
      <div className="skeleton-image"></div>

      {/* Skeleton Content */}
      <div className="skeleton-content">
        {/* Title Skeleton */}
        <div className="skeleton-line skeleton-title"></div>

        {/* Description Skeleton */}
        <div className="skeleton-line skeleton-description"></div>
        <div className="skeleton-line skeleton-description short"></div>

        {/* Meta Skeleton */}
        <div className="skeleton-meta">
          <div className="skeleton-line skeleton-small"></div>
          <div className="skeleton-line skeleton-small"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="skeleton-footer">
          <div className="skeleton-line skeleton-price"></div>
          <div className="skeleton-line skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * SkeletonGrid Component
 * Displays multiple skeleton loaders in a grid layout
 */
export const SkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, idx) => (
        <LoadingSkeleton key={idx} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
