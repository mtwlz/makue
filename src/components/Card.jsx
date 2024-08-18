// src/components/Card.js
import React from 'react';
import '../styles/card.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Card = ({ children }) => {
  const { darkMode } = React.useContext(ThemeContext);
  return (
    <div 
      className={`card ${darkMode ? 'dark' : ''}`}
      aria-label='Card component'
    >
      {children}
    </div>
  );
};

export default Card;
