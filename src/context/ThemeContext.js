import { createContext, useState, useContext, useMemo } from 'react';
import { COLORS } from '../constants/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeColors = useMemo(() => {
    return {
      background: theme === 'light' ? null : COLORS.dark.background,
      surface: theme === 'light' ? COLORS.white : COLORS.dark.surface,
      primaryText: theme === 'light' ? COLORS.primaryText : COLORS.dark.primaryText,
      secondaryText: theme === 'light' ? COLORS.secondaryText : COLORS.dark.secondaryText,
      border: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : COLORS.dark.border,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
