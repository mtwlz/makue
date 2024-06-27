// Make an Icon component that takes a context prop and renders a icon from FontAwesome.
import React, { useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import PropTypes from 'prop-types';

const Icon = (props) => {
    const { darkMode } = React.useContext(ThemeContext);
    const { icon, spin, fade, beat, bounce, flip, shake, custom, context } = props;
    const [classes, setClasses] = React.useState(['fa']);

    // Assemble the classes, because that's literally all FontAwesome needs
    useEffect(() => {
        let newClasses = ['fa'];

        // Does classes contain the icon?
        newClasses.push(`fa-${icon}`);

        // The basic animations
        if (spin) newClasses.push('fa-spin');
        if (fade) newClasses.push('fa-fade');
        if (beat) newClasses.push('fa-beat');
        if (bounce) newClasses.push('fa-bounce');
        if (flip) newClasses.push('fa-flip');
        if (shake) newClasses.push('fa-shake');

        // Anything else really, allows for animation utilities.
        if (custom) newClasses.push(custom);

        // Set the classes
        setClasses([...newClasses]);
    }, [spin, fade, darkMode, context, icon, beat, bounce, flip, shake, custom]);

    return (
        <i 
            className={classes.join(' ')}
            aria-label={`${icon} icon`} 
            style={{
                color: context ? `var(--${context})` : `var(--text${darkMode ? '-dark' : ''})`,
            }}
        />
    );
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    spin: PropTypes.bool,
    fade: PropTypes.bool,
    context: PropTypes.string,
};

export default Icon;