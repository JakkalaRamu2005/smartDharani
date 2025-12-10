import React from 'react';
import './SkeletonLoader.css';

/**
 * SkeletonLoader Component
 * 
 * Displays placeholder content while data is loading.
 * Provides visual feedback and improves perceived performance.
 * 
 * @param {string} variant - Type of skeleton: 'text' | 'title' | 'card' | 'circle' | 'rectangle'
 * @param {number} width - Width in pixels or percentage (optional)
 * @param {number} height - Height in pixels (optional)
 * @param {number} count - Number of skeleton items to render (default: 1)
 * @param {string} className - Additional CSS classes
 */
const SkeletonLoader = ({
    variant = 'text',
    width,
    height,
    count = 1,
    className = ''
}) => {
    const skeletonStyle = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? `${height}px` : undefined,
    };

    const skeletonClasses = `skeleton skeleton--${variant} ${className}`;

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={skeletonClasses}
                    style={skeletonStyle}
                    aria-hidden="true"
                />
            ))}
        </>
    );
};

/**
 * SkeletonCard Component
 * 
 * Pre-built skeleton for card layouts (image + text)
 */
export const SkeletonCard = () => (
    <div className="skeleton-card" aria-hidden="true">
        <div className="skeleton skeleton--rectangle skeleton-card__image" />
        <div className="skeleton-card__content">
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--text" />
            <div className="skeleton skeleton--text" style={{ width: '60%' }} />
        </div>
    </div>
);

/**
 * SkeletonList Component
 * 
 * Pre-built skeleton for list items
 */
export const SkeletonList = ({ count = 3 }) => (
    <div className="skeleton-list" aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="skeleton-list__item">
                <div className="skeleton skeleton--circle" />
                <div className="skeleton-list__text">
                    <div className="skeleton skeleton--text" />
                    <div className="skeleton skeleton--text" style={{ width: '70%' }} />
                </div>
            </div>
        ))}
    </div>
);

export default SkeletonLoader;
