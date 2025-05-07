import React, { createContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from "socket.io-client";


import { API_URL } from './DB/appel';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

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
          connectSocket(user);
      } catch (error) {
          console.error("Ошибка входа:", error.message);
      }
  };

  const connectSocket = (userData) => {
    if (!socketRef.current) {
      socketRef.current = io(API_URL, {
        transports: ['websocket'],
        query: { userId: userData.ID_user },
      });

      socketRef.current.on('connect', () => {
        console.log('Socket подключён:', socketRef.current.id);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket отключён');
      });
    }
  };
  
  const logout = async () => {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      setUser(null);
      disconnectSocket();
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          connectSocket(parsedUser);
        }
      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    return () => {
      disconnectSocket();
    };
  }, []);

    return (
    <AuthContext.Provider value={{ user, signIn, logout, loading, socket: socketRef.current }}>
            {children}
    </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }

