import React from 'react'
import '../styles/toggle.css';
import { ThemeContext } from '../contexts/ThemeContext';
import Uuid from '../utilities/Uuid';

function Toggle(props) {
    const { value, labelOn, labelOff, context, onToggle, id, disabled } = props;
    const { darkMode } = React.useContext(ThemeContext);
    const [toggled, setToggled] = React.useState(value);
    const [toggleId] = React.useState(id || `toggle-${Uuid.generate()}`);

    const onLabel = labelOn || 'On';
    const offLabel = labelOff || 'Off';

    const handleToggle = () => {
        // Change state of toggled
        setToggled(prev => !prev);

        if (!onToggle) {
            console.error(`No 'onToggle' [Function] prop provided for Toggle component "${toggleId}".`);
            return;
        }

        // Call the function, we have to pass the opposite of the current toggled state because the state hasn't updated yet
        onToggle(!toggled);
    };


    return (
        <div 
            id={toggleId} 
            className={`toggle ${toggled ? 'on' : ''} ${darkMode ? 'dark' : ''} ${context || ''} ${disabled ? 'disabled' : ''}`} 
            onClick={handleToggle}
            aria-label={`Toggle (${toggled ? 'On' : 'Off'}) ${toggleId}`}
        >
            <div className="ball"></div>
            <div className="shadow"></div>
            <div className="bg active">
                <span>{onLabel}</span>
            </div>
            <div className="bg inactive">
                <span>{offLabel}</span>
            </div>
        </div>
    )
}

export default Toggle
