import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Title() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.boxTitle}>
      <Text style={[styles.textTitle, { color: theme.primary }]}>
        Calculadora de IMC
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxTitle: {
    alignItems: 'center',
    marginVertical: 20,
  },
  textTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
