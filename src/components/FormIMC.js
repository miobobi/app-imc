import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import Result from './Result';
import Classification from './Classification';
import IdealWeight from './IdealWeight';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

export default function FormIMC() {
  const { theme } = useContext(ThemeContext);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [imc, setImc] = useState(null);
  const [classification, setClassification] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem('imcHistory');
    if (data) setHistory(JSON.parse(data));
  };

  const saveHistory = async (value) => {
    const newHistory = [...history, value];
    setHistory(newHistory);
    await AsyncStorage.setItem('imcHistory', JSON.stringify(newHistory));
  };

  const validateInputs = () => {
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
      Alert.alert('Erro', 'Informe altura e peso válidos!');
      return false;
    }
    return true;
  };

  const classifyIMC = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade grau 1';
    if (imc < 40) return 'Obesidade grau 2';
    return 'Obesidade grau 3 (mórbida)';
  };

  const calcIMC = () => {
    if (!validateInputs()) return;
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const imcCalc = (weightNum / (heightNum * heightNum)).toFixed(2);
    setImc(imcCalc);
    setClassification(classifyIMC(imcCalc));
    saveHistory({ date: new Date().toLocaleString(), imc: imcCalc });
    Keyboard.dismiss();
  };

  return (
    <View style={styles.formContext}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        placeholder="Altura (ex: 1.75)"
        placeholderTextColor={theme.text + '99'}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        placeholder="Peso (ex: 70)"
        placeholderTextColor={theme.text + '99'}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={calcIMC}
      >
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
      {imc && (
        <>
          <Result result={imc} />
          <Classification text={classification} />
          <IdealWeight height={height} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContext: {
    paddingVertical: 20,
  },
  input: {
    marginBottom: 15,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
