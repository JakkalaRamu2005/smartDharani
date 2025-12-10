import React from 'react';
import './ErrorBoundary.css';

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Usage: Wrap your app or specific components
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // You can also log to an error reporting service here
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });

        // Reload the page to reset the app
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="error-boundary-container" role="alert">
                    <div className="error-boundary-content">
                        <div className="error-icon">⚠️</div>
                        <h1 className="error-title">Oops! Something went wrong</h1>
                        <p className="error-message">
                            We're sorry for the inconvenience. The application encountered an unexpected error.
                        </p>

                        <div className="error-actions">
                            <button
                                onClick={this.handleReset}
                                className="btn btn-primary"
                                aria-label="Reload the application"
                            >
                                🔄 Reload Application
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-secondary"
                                aria-label="Go back to previous page"
                            >
                                ← Go Back
                            </button>
                        </div>

                        {/* Show error details in development */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-details">
                                <summary>Error Details (Development Only)</summary>
                                <pre className="error-stack">
                                    <strong>Error:</strong> {this.state.error.toString()}
                                    {'\n\n'}
                                    <strong>Stack Trace:</strong>
                                    {'\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
