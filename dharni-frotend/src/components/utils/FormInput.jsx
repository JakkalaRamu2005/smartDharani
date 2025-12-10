import React, { useState } from 'react';
import './FormInput.css';

/**
 * FormInput Component
 * 
 * Enhanced form input with validation, icons, helper text, and success states.
 * 
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Is field required
 * @param {string} icon - Icon to display (emoji or component)
 * @param {string} helperText - Helper text below input
 * @param {function} validate - Validation function (returns error message or null)
 * @param {boolean} showValidation - Show validation states
 * @param {string} error - External error message
 */
const FormInput = ({
    type = 'text',
    label,
    value,
    onChange,
    placeholder,
    required = false,
    icon = null,
    helperText = '',
    validate = null,
    showValidation = true,
    error: externalError = '',
    ...props
}) => {
    const [isTouched, setIsTouched] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [internalError, setInternalError] = useState('');

    const inputId = props.id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    // Run validation
    const handleBlur = () => {
        setIsTouched(true);
        setIsFocused(false);

        if (validate && value) {
            const errorMsg = validate(value);
            setInternalError(errorMsg || '');
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleChange = (e) => {
        onChange(e);

        // Real-time validation after first touch
        if (isTouched && validate) {
            const errorMsg = validate(e.target.value);
            setInternalError(errorMsg || '');
        }
    };

    const errorMessage = externalError || internalError;
    const isValid = isTouched && !errorMessage && value && showValidation;
    const isInvalid = isTouched && errorMessage && showValidation;

    return (
        <div className={`form-input-container ${isInvalid ? 'has-error' : ''} ${isValid ? 'has-success' : ''}`}>
            {label && (
                <label htmlFor={inputId} className="form-input-label">
                    {label}
                    {required && <span className="required-indicator" aria-label="required">*</span>}
                </label>
            )}

            <div className={`form-input-wrapper ${isFocused ? 'focused' : ''}`}>
                {icon && (
                    <span className="form-input-icon" aria-hidden="true">
                        {icon}
                    </span>
                )}

                <input
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    required={required}
                    aria-required={required}
                    aria-invalid={isInvalid}
                    aria-describedby={helperText ? `${inputId}-helper` : undefined}
                    className={`form-input ${icon ? 'has-icon' : ''}`}
                    {...props}
                />

                {/* Success checkmark */}
                {isValid && (
                    <span className="form-input-status success" aria-label="Valid input">
                        ✓
                    </span>
                )}

                {/* Error indicator */}
                {isInvalid && (
                    <span className="form-input-status error" aria-label="Invalid input">
                        ⚠
                    </span>
                )}
            </div>

            {/* Helper text or error message */}
            {(helperText || errorMessage) && (
                <div
                    id={`${inputId}-helper`}
                    className={`form-input-help ${errorMessage ? 'error' : ''}`}
                    role={errorMessage ? 'alert' : 'status'}
                >
                    {errorMessage || helperText}
                </div>
            )}
        </div>
    );
};

export default FormInput;
