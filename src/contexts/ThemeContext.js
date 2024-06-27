// src/contexts/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  
  // Theme
  const [theme, setTheme] = useState('theme-classic');
  const switchTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, darkMode, toggleDarkMode }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// export { ThemeProvider, ThemeContext };
export const useTheme = () => useContext(ThemeContext);
