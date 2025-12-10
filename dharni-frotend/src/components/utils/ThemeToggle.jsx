import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

/**
 * ThemeToggle Component
 * 
 * Toggle button to switch between light and dark themes.
 * Shows sun icon for light mode, moon icon for dark mode.
 */
const ThemeToggle = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span className="theme-toggle-icon" aria-hidden="true">
                {isDark ? '☀️' : '🌙'}
            </span>
            <span className="theme-toggle-text">
                {isDark ? 'Light' : 'Dark'}
            </span>
        </button>
    );
};

export default ThemeToggle;
