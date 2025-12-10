import React from 'react';
import './EmptyState.css';

/**
 * EmptyState Component
 * 
 * Displays a friendly message when there's no data to show.
 * Helps users understand why they're seeing an empty screen.
 * 
 * @param {string} icon - Emoji or icon to display
 * @param {string} title - Main heading
 * @param {string} message - Description text
 * @param {React.ReactNode} action - Optional action button or element
 * @param {string} variant - Style variant: 'default' | 'search' | 'error'
 */
const EmptyState = ({
    icon = '📭',
    title = 'No data found',
    message = 'There's nothing here yet.',
  action = null,
    variant = 'default'
}) => {
    return (
        <div className={`empty-state empty-state--${variant}`} role="status">
            <div className="empty-state-icon" aria-hidden="true">{icon}</div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-message">{message}</p>
            {action && (
                <div className="empty-state-action">
                    {action}
                </div>
            )}
        </div>
    );
};

/**
 * Pre-built Empty State Variants
 */

export const EmptySearch = ({ searchTerm, onReset }) => (
    <EmptyState
        icon="🔍"
        title="No results found"
        message={searchTerm ? `No results for "${searchTerm}". Try adjusting your search.` : 'Try different search terms.'}
        action={onReset && (
            <button onClick={onReset} className="btn btn-outline">
                Clear Search
            </button>
        )}
        variant="search"
    />
);

export const EmptyList = ({ itemName = 'items', onCreate }) => (
    <EmptyState
        icon="📝"
        title={`No ${itemName} yet`}
        message={`You haven't created any ${itemName} yet. Get started by creating your first one!`}
        action={onCreate && (
            <button onClick={onCreate} className="btn btn-primary">
                + Create {itemName}
            </button>
        )}
    />
);

export const EmptyError = ({ onRetry }) => (
    <EmptyState
        icon="⚠️"
        title="Failed to load data"
        message="We couldn't load the data. Please try again."
        action={onRetry && (
            <button onClick={onRetry} className="btn btn-primary">
                🔄 Try Again
            </button>
        )}
        variant="error"
    />
);

export const EmptyNetwork = ({ onRetry }) => (
    <EmptyState
        icon="📡"
        title="No internet connection"
        message="Please check your connection and try again."
        action={onRetry && (
            <button onClick={onRetry} className="btn btn-primary">
                🔄 Retry
            </button>
        )}
        variant="error"
    />
);

export default EmptyState;
