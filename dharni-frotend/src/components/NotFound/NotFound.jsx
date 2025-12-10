import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound Component (404 Page)
 * 
 * Custom 404 page displayed when user navigates to a non-existent route.
 * Provides helpful navigation options to get back on track.
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-animation">
                    <div className="number-404">404</div>
                    <div className="plant-icon">🌾</div>
                </div>

                <h1 className="not-found-title">Page Not Found</h1>
                <p className="not-found-message">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>

                <div className="not-found-actions">
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-primary btn-lg"
                        aria-label="Go to home page"
                    >
                        🏠 Go Home
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline btn-lg"
                        aria-label="Go back to previous page"
                    >
                        ← Go Back
                    </button>
                </div>

                <div className="not-found-links">
                    <p className="links-title">Quick Links:</p>
                    <div className="quick-links">
                        <button onClick={() => navigate('/crop-selection')} className="quick-link">
                            🌱 Crop Recommendations
                        </button>
                        <button onClick={() => navigate('/issue-diagnosis')} className="quick-link">
                            🔍 Issue Diagnosis
                        </button>
                        <button onClick={() => navigate('/marketplace')} className="quick-link">
                            🛒 Marketplace
                        </button>
                        <button onClick={() => navigate('/contact')} className="quick-link">
                            📞 Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
