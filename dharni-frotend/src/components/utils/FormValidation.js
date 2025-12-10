/**
 * Form Validation Utilities
 * 
 * Reusable validation functions for common form inputs.
 * Each function returns an error message string or null if valid.
 */

/**
 * Email validation
 */
export const validateEmail = (email) => {
    if (!email) return 'Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    return null;
};

/**
 * Password validation
 */
export const validatePassword = (password) => {
    if (!password) return 'Password is required';

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    if (password.length > 50) {
        return 'Password must be less than 50 characters';
    }

    return null;
};

/**
 * Password strength checker
 * Returns: { strength: 'weak' | 'medium' | 'strong', score: 0-100, message: string }
 */
export const checkPasswordStrength = (password) => {
    if (!password) {
        return { strength: 'weak', score: 0, message: 'Enter a password' };
    }

    let score = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    // Calculate score
    if (checks.length) score += 20;
    if (checks.lowercase) score += 20;
    if (checks.uppercase) score += 20;
    if (checks.numbers) score += 20;
    if (checks.special) score += 20;

    // Determine strength
    let strength = 'weak';
    let message = 'Weak password';

    if (score >= 80) {
        strength = 'strong';
        message = 'Strong password';
    } else if (score >= 50) {
        strength = 'medium';
        message = 'Medium password';
    }

    return { strength, score, message };
};

/**
 * Required field validation
 */
export const validateRequired = (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
        return `${fieldName} is required`;
    }
    return null;
};

/**
 * Phone number validation (Indian format)
 */
export const validatePhone = (phone) => {
    if (!phone) return 'Phone number is required';

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        return 'Please enter a valid 10-digit phone number';
    }

    return null;
};

/**
 * Name validation
 */
export const validateName = (name) => {
    if (!name) return 'Name is required';

    if (name.length < 2) {
        return 'Name must be at least 2 characters';
    }

    if (name.length > 50) {
        return 'Name must be less than 50 characters';
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        return 'Name can only contain letters and spaces';
    }

    return null;
};

/**
 * URL validation
 */
export const validateURL = (url) => {
    if (!url) return null; // Optional field

    try {
        new URL(url);
        return null;
    } catch {
        return 'Please enter a valid URL';
    }
};

/**
 * Number validation
 */
export const validateNumber = (value, min = null, max = null) => {
    if (!value) return 'This field is required';

    const num = Number(value);
    if (isNaN(num)) {
        return 'Please enter a valid number';
    }

    if (min !== null && num < min) {
        return `Value must be at least ${min}`;
    }

    if (max !== null && num > max) {
        return `Value must be at most ${max}`;
    }

    return null;
};

/**
 * Confirm password validation
 */
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    return null;
};

/**
 * Generic length validation
 */
export const validateLength = (value, min, max, fieldName = 'This field') => {
    if (!value) return `${fieldName} is required`;

    if (value.length < min) {
        return `${fieldName} must be at least ${min} characters`;
    }

    if (value.length > max) {
        return `${fieldName} must be less than ${max} characters`;
    }

    return null;
};
