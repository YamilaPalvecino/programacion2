import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';


const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !surname || !email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.18.89:8080/register', // Cambia a 10.0.2.2 si estás en un emulador
        {
          name,
          surname,
          email,
          password,
          role: 'CLIENT',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.data) {
        Alert.alert('Éxito', 'Registro exitoso. Ahora puedes iniciar sesión.');
        Linking.openURL('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color="#FFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido"
        value={surname}
        onChangeText={setSurname}
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Pressable
        onPress={handleRegister}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    color: '#FFF',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
