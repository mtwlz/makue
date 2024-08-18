import React from 'react';
import PropTypes from 'prop-types';
import '../styles/checkbox.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Checkbox = ({ checked, onChange, label, context, disabled }) => {
  const { darkMode } = React.useContext(ThemeContext);
  const [isChecked, setIsChecked] = React.useState(false);

  // To get rid of the silly React warning about controlled/uncontrolled components
  React.useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleChange = (e) => {
    if (onChange) onChange(e.target.checked);
    setIsChecked(e.target.checked);
  };

  return (
    <label className={`checkbox-container ${context} ${darkMode ? 'dark' : ''} ${disabled ? 'disabled' : ''}`}>
      {label}
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <div className={`checkbox${isChecked ? ' checked' : ''}`}>
        <span className="checkmark"></span>
      </div>
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  context: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'caution', 'info', 'important']),
  disabled: PropTypes.bool,
};

export default Checkbox;
