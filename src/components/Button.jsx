// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/button.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Button = ({ children, onClick, context, bordered, disabled }) => {
    const { darkMode } = React.useContext(ThemeContext);

    let classList = ['button'];
    if (bordered) classList.push('bordered');
    if (disabled) classList.push('disabled');
    if (darkMode) classList.push('dark');
    if (context) classList.push(context);

    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled) onClick();
    };

    return (
        <button 
            className={classList.join(' ')} 
            onClick={(e) => handleClick(e)}
            aria-label={`${context || 'Regular'} button`}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    context: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'caution', 'info', 'important']),
    bordered: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Button;
