// src/components/Result.js

import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

// Componente que exibe o resultado numérico do IMC calculado
export default function Result({ result }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.resultBox}>
      {/* Texto descritivo */}
      <Text style={[styles.text, { color: theme.text }]}>Seu IMC é:</Text>

      {/* Valor numérico do IMC com destaque na cor primária */}
      <Text style={[styles.result, { color: theme.primary }]}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: {
    marginTop: 20,
    alignItems: 'center', // Centraliza os textos
  },
  text: {
    fontSize: 16,
  },
  result: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
