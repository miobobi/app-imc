import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

// Componente que exibe o título principal do aplicativo
export default function Title() {
  // Usa o tema atual para aplicar cores dinâmicas
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.boxTitle}>
      {/* Título estilizado com a cor primária do tema */}
      <Text style={[styles.textTitle, { color: theme.primary }]}>Calculadora de IMC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxTitle: {
    alignItems: 'center', // Centraliza horizontalmente
    marginVertical: 20,   // Espaço acima e abaixo
  },
  textTitle: {
    fontSize: 28,
    fontWeight: 'bold', // Negrito para destaque
  },
});
