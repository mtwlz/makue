import React from 'react';
import PropTypes from 'prop-types';
import '../styles/textinput.css';
import { ThemeContext } from '../contexts/ThemeContext';
import Icon from './Icon';

const TextInput = ({ value, onChange, placeholder, context, disabled, success, error, label, icon, validText }) => {
  const { darkMode } = React.useContext(ThemeContext);
  const [iconContext, setIconContext] = React.useState(undefined);

  React.useEffect(() => {
    if (success && error) {
      console.warn('TextInput component received both success and error props. Please provide only one.');
    }

    if (error) {
        setIconContext('danger');
    } else if (success) {
      setIconContext('success');
    } else if (context) {
        setIconContext(context);
    } else {
        setIconContext(undefined);
    }

  }, [success, error, context]);

  return (
    <label className={`text-input-container ${context ? context : ''} ${darkMode ? 'dark' : ''} ${disabled ? 'disabled' : ''}`}>
        {label && (<span className='text-input-label'>{label}</span>)}
        <div className='text-input-inner-container'>
            {icon && <Icon icon={icon} context={iconContext} />}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`text-input ${context ? context : ''} ${darkMode ? 'dark' : ''} ${success ? 'success' : ''} ${error ? 'error' : ''} ${icon ? 'with-icon' : ''}`}
                disabled={disabled}
            />
        </div>
        {validText && (
            <span className={`text-input-valid-text ${success ? 'success' : ''} ${error ? 'error' : ''}`}>{validText}</span>
        )}
    </label>
  );
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  context: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'caution', 'info', 'important']),
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  context: 'primary',
  disabled: false,
};

export default TextInput;
