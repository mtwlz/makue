// src/components/Toast.js
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/toast.css';
import { useToastContext } from '../contexts/ToastContext';
import { ThemeContext } from '../contexts/ThemeContext';
import Icon from './Icon';
import Uuid from '../utilities/Uuid';

const Toast = (props) => {
    const { id = Uuid.generate(), message, context, duration, onClick, progressBar, title, icon, children } = props;
    const { darkMode } = React.useContext(ThemeContext);
    const { removeToast } = useToastContext();
    const [isShowing, setIsShowing] = React.useState(false);
    const [progress, setProgress] = React.useState(duration || 0);

    // Put closing in a function so we DRY
    const handleClose = useCallback(() => {
        setIsShowing(false);
        setTimeout(() => removeToast(id), 500); // Allows animation to finish
    }, [id, removeToast]);

    // Check if toast is hovered
    const checkIfHovered = useCallback(() => {
        const toast = document.getElementById(id);
        return toast && toast.matches(':hover');
    }, [id]);

    useEffect(() => {
        setIsShowing(true);

        if (!duration) return;

        // Interval for progress bar
    const interval = setInterval(() => {
        // Pause if toast is hovered
        if (checkIfHovered()) return;
  
        // If toast is not hovered, update progress or close if time's up
        setProgress((prevProgress) => {
          if (prevProgress <= 100) {
            clearInterval(interval);
            handleClose();
            return 0;
          }
          return prevProgress - 100;
        });
      }, 100);
  
      return () => clearInterval(interval);
    }, [id, duration, handleClose, progress, checkIfHovered]);

    const handleClick = () => {
        if (onClick) onClick();
        handleClose();
    };

    return (
        <div id={id} className={`toast ${context} ${darkMode ? 'dark' : ''} ${isShowing ? 'showing' : ''}`} onClick={handleClick} aria-label='Toast message'>
            {icon && (
                <div className='icon'>
                    <Icon icon={icon} />
                </div>
            )}
            <div className='content-container'>
                {title && <span className='title'>{title}</span>}
                {message}
                {children && <div className='children'>{children}</div>}
                {progressBar && duration && (
                    <div className='progress-container'>
                        <div 
                            className='progress-bar' 
                            style={{ 
                                width: `${(progress / duration) * 100}%`,
                                backgroundColor: ((progress / duration) * 100 < 40) ? (context !== 'danger' ? 'var(--danger)' : 'white') : undefined,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

Toast.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    context: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'caution', 'info', 'important']).isRequired,
    duration: PropTypes.number,
    darkMode: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Toast;
