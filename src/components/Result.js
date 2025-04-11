import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Result({ result }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.resultBox}>
      <Text style={[styles.text, { color: theme.text }]}>Seu IMC é:</Text>
      <Text style={[styles.result, { color: theme.primary }]}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  result: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
