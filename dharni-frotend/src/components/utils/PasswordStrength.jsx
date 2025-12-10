import React from 'react';
import { checkPasswordStrength } from './FormValidation';
import './PasswordStrength.css';

/**
 * PasswordStrength Component
 * 
 * Visual indicator showing password strength with color-coded bar and tips.
 * 
 * @param {string} password - Password to evaluate
 * @param {boolean} show - Whether to show the indicator
 */
const PasswordStrength = ({ password, show = true }) => {
    if (!show || !password) return null;

    const { strength, score, message } = checkPasswordStrength(password);

    const tips = [];
    if (password.length < 8) tips.push('At least 8 characters');
    if (!/[a-z]/.test(password)) tips.push('One lowercase letter');
    if (!/[A-Z]/.test(password)) tips.push('One uppercase letter');
    if (!/\d/.test(password)) tips.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) tips.push('One special character');

    return (
        <div className="password-strength" role="status" aria-live="polite">
            <div className="password-strength-bar">
                <div
                    className={`password-strength-fill password-strength-fill--${strength}`}
                    style={{ width: `${score}%` }}
                    aria-label={`Password strength: ${message}`}
                />
            </div>

            <div className="password-strength-info">
                <span className={`password-strength-label password-strength-label--${strength}`}>
                    {message}
                </span>

                {tips.length > 0 && (
                    <div className="password-strength-tips">
                        <span className="tips-label">Add:</span>
                        {tips.map((tip, index) => (
                            <span key={index} className="tip-item">
                                {tip}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordStrength;
