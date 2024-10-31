import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const saveUserData = async (userData: any) => {
    try {
      const { token, id } = userData;
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('userId', id.toString());
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.0.105:8080/login', // Cambia a 10.0.2.2 si estás en un emulador
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.data) {
        await saveUserData(response.data);
        router.replace('/(tabs)/home'); // Cambia a la ruta deseada
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error:', error.response?.data || error.message);
        Alert.alert('Error', error.response?.data?.message || 'Error al iniciar sesión');
      } else {
        console.error('Error:', error);
        Alert.alert('Error', 'Ocurrió un error inesperado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Pressable
        onPress={handleLogin}
        style={{ backgroundColor: 'blue', padding: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Ingresar</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
