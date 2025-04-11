import React, { createContext, useState } from 'react';
import { lightTheme, darkTheme } from '../theme/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ theme, darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
