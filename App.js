// App.js
// Importando bibliotecas e componentes
import React, { useContext } from 'react';
import { View, Switch, StyleSheet, StatusBar } from 'react-native';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import Title from './src/components/Title';
import FormIMC from './src/components/FormIMC';

// Componente principal que usa o contexto de tema para alternar entre claro e escuro
function MainApp() {
  const { theme, darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    // Define o fundo com base no tema atual
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Barra de status personalizada para combinar com o tema */}
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      {/* Botão para alternar entre modo claro e escuro */}
      <Switch value={darkMode} onValueChange={toggleTheme} />

      {/* Título do aplicativo */}
      <Title />

      {/* Formulário de entrada de altura/peso e cálculo do IMC */}
      <FormIMC />
    </View>
  );
}

// Exportando o App com o provedor de tema
export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

// Estilos da tela principal
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    paddingTop: 40, // Espaço no topo para não colar na barra de status
    paddingHorizontal: 20, // Margem lateral
  },
});
