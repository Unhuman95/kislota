import React, { useContext, useState, useCallback, useEffect } from 'react'
import {View, FlatList, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../../design/style';
import { selectContacts } from '../DB/appel';
import { AuthContext } from '../context';


const ContactList = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [contacts, setContacts] = useState();
  
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  //const CACHE_TTL = 10 * 60 * 1000; // 10 минут в миллисекундах
  const cacheKey = `contacts_${user.ID_user}`;

  useEffect(() => {
    let isMounted = true;
    const loadFromCache = async () => {
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.contacts && isMounted) {
            setContacts(parsed.contacts);
          }
        }
      } catch (err) {
        console.warn('Не удалось загрузить кэш:', err);
      }
    };

    const init = async () => {
        await loadFromCache();
        await fetchTasks();
    };

    init();

    return () => {
      isMounted = false;
    };
    }, [user.ID_user, user.role]);

  const fetchTasks = async () => {
    try {
      const freshData = await selectContacts(user.ID_user, user.role);
      setContacts(freshData);
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({ contacts: freshData, timestamp: Date.now() })
      );
    } catch (error) {
      console.error('Ошибка при загрузке данных с сервера:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
  };

  const handlePress = (name, id) => {
    navigation.navigate('chat_screen', {name, id});
  }

  return (
    <View style={styles.view}>
      {loading ? (
        <ActivityIndicator size="large" />):
        (<FlatList
          data={contacts}
          renderItem={({item}) => 
            <Item 
              name={item.name} 
              id={item.ID_contact} 
              last_message={item.last_message}
              time_stamp={item.time_stamp}
              //image = {item.image}
              handlePress = {handlePress}
            />}
            keyExtractor={(item) => item.ID_contact.toString()}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />)}
    </View>
  )
};

const Item = ({ name, id, last_message, time_stamp, handlePress }) => { 
  const date = new Date(time_stamp);
  const isoString = date.toISOString();
  const time = isoString.slice(11, 16);

  return(
  <TouchableOpacity style={styles.container} onPress = {() => handlePress(name, id)}>
    {/*<Image
      source = {{uri: image}}
      style = {styles.avatar}
      resizeMode={'contain'}/>*/}
    <View style = {styles.contact}>
      <Text style = {[styles.name]}>{name}</Text>
      <View style = {styles.last}>
        <Text style = {styles.last_message}>{last_message}</Text>
        <Text style = {{alignSelf: 'flex-end'}}>{time}</Text>
      </View>
    </View>
  </TouchableOpacity>
  );
}

export default ContactList;