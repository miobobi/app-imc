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

// Componente principal que exibe o formulário e realiza o cálculo do IMC
export default function FormIMC() {
  const { theme } = useContext(ThemeContext);

  // Estados para altura, peso, IMC, classificação e histórico
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [imc, setImc] = useState(null);
  const [classification, setClassification] = useState('');
  const [history, setHistory] = useState([]);

  // Carrega o histórico salvo no AsyncStorage ao iniciar
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

  // Validação simples das entradas
  const validateInputs = () => {
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
      Alert.alert('Erro', 'Informe altura e peso válidos!');
      return false;
    }
    return true;
  };

  // Retorna o texto de classificação de acordo com o valor do IMC
  const classifyIMC = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade grau 1';
    if (imc < 40) return 'Obesidade grau 2';
    return 'Obesidade grau 3 (mórbida)';
  };

  // Cálculo do IMC com base na fórmula peso / altura^2
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
      {/* Campo de entrada para altura */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        placeholder="Altura (ex: 1.75)"
        placeholderTextColor={theme.text + '99'}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      {/* Campo de entrada para peso */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        placeholder="Peso (ex: 70)"
        placeholderTextColor={theme.text + '99'}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      {/* Botão para calcular o IMC */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={calcIMC}
      >
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {/* Exibição dos resultados, caso o IMC tenha sido calculado */}
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
