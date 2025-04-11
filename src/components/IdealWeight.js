import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function IdealWeight({ height }) {
  const { theme } = useContext(ThemeContext);
  const h = parseFloat(height);
  if (isNaN(h)) return null;

  const min = (18.5 * h * h).toFixed(1);
  const max = (24.9 * h * h).toFixed(1);

  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: theme.text }]}>Peso Ideal:</Text>
      <Text style={[styles.text, { color: theme.text }]}>
        Entre {min}kg e {max}kg
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 15,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});
