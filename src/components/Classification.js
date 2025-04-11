import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Classification({ text }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.box}>
      <Text style={[styles.title, { color: theme.text }]}>Classificação:</Text>
      <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
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
