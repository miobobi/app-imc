import React, { useContext } from 'react';
import { View, Switch, StyleSheet, StatusBar } from 'react-native';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import Title from './src/components/Title';
import FormIMC from './src/components/FormIMC';

function MainApp() {
  const { theme, darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <Switch value={darkMode} onValueChange={toggleTheme} />
      <Title />
      <FormIMC />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});
