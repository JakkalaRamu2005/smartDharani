import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * 
 * A reusable, accessible loading spinner with multiple size options.
 * Automatically announces loading state to screen readers.
 * 
 * @param {string} size - Size of spinner: 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} color - Color variant: 'primary' | 'white' | 'gray' (default: 'primary')
 * @param {string} label - Accessible label for screen readers (default: 'Loading...')
 * @param {boolean} fullScreen - If true, centers spinner in full viewport
 */
const LoadingSpinner = ({
    size = 'md',
    color = 'primary',
    label = 'Loading...',
    fullScreen = false
}) => {
    const spinnerClasses = `loading-spinner loading-spinner--${size} loading-spinner--${color}`;
    const containerClasses = fullScreen ? 'loading-spinner-container--fullscreen' : '';

    return (
        <div className={containerClasses} role="status" aria-live="polite">
            <div className={spinnerClasses} aria-hidden="true"></div>
            <span className="sr-only">{label}</span>
        </div>
    );
};

export default LoadingSpinner;
