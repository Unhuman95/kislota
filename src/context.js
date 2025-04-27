import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from './DB/appel';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (login, password) => {
      try {
          const res = await fetch(`${API_URL}login`, {
              method: 'POST',
              headers:{
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({login, password}),
          });

          if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
          }
  
          const data = await res.json();
          const { token, user } = data;
  
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", JSON.stringify(user));
  
          setUser(user);
      } catch (error) {
          console.error("Ошибка входа:", error.message);
      }
  };
  
  const logout = async () => {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

    return (
    <AuthContext.Provider value={{ user, signIn, logout, loading }}>
            {children}
    </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }

