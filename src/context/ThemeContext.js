// Importa React e os temas claro e escuro
import React, { createContext, useState } from 'react';
import { lightTheme, darkTheme } from '../theme/themes';

// Cria o contexto que será usado em toda a aplicação
export const ThemeContext = createContext();

// Provedor do tema que encapsula a lógica de alternar entre claro e escuro
export const ThemeProvider = ({ children }) => {
  // Estado para saber se está em modo escuro
  const [darkMode, setDarkMode] = useState(false);

  // Define qual tema será usado com base no modo atual
  const theme = darkMode ? darkTheme : lightTheme;

  // Função para alternar o tema
  const toggleTheme = () => setDarkMode(!darkMode);

  // Prove o tema, o estado e a função de alternar para os componentes filhos
  return (
    <ThemeContext.Provider value={{ theme, darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};