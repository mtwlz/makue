import React, { createContext, useState } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create a custom hook for accessing the theme
export const useTheme = () => React.useContext(ThemeContext);

// Theme provider to wrap around components
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-classic');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (value) => {
    setDarkMode(value);
  };

  const switchTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, toggleDarkMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
