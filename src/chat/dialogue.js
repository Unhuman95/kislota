import React, { useEffect, useState, useLayoutEffect, useContext, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import styles from '../../design/style';
import { AuthContext } from '../context';
import { selectMessages, } from '../DB/appel';

export default function ChatScreen({route, navigation}) {
  const { user, socket } = useContext(AuthContext); 

  const {name, id} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
      navigation.setOptions({
        title: name,
      });
  }, [navigation, name]);

  const cacheKey = `messages_${user.ID_user}_${id}`;

  useEffect(() => {
    let isMounted = true;
    const loadFromCache = async () => {
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.messages && isMounted) {
            setMessages(parsed.messages);
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

    socket.on('receive_message', msg => {
      if (
        (msg.ID_sender === user.ID_user && msg.ID_receiver === id) ||
        (msg.ID_sender === id && msg.ID_receiver === user.ID_user)
      ) {
        if (msg && !isNaN(new Date(msg.time_stamp))) {
          setMessages(prev => [msg, ...prev]);
        }
      }
    });
  
  }, [user.ID_user, user.role, id]);

  const fetchTasks = async () => {
    try {
      const freshData = await selectMessages(user.ID_user, id);
      setMessages(freshData);
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({ messages: freshData, timestamp: Date.now() })
      );
    } catch (error) {
      console.error('Ошибка при загрузке данных с сервера:', error);
    } finally {
      //setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
  };

  const sendMessage = async () => {
    const msgData = {
      ID_sender: user.ID_user,
      ID_receiver: id,
      content: message
    };
    socket.emit('send_message', msgData);
    setMessage('');
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 500);
    await fetchTasks();
  };

  const Item = ({ content, ID_sender, time_stamp }) => {
    const date = new Date(time_stamp);
    const isoString = date.toISOString();
    const time = isoString.slice(11, 16);
    const isOwnMessage = ID_sender === user.ID_user;
    return (
      <View style={[{flex: 1}, isOwnMessage ? styles.own_message : styles.smo_message]}>
        <View style={[styles.massege]}>
          <Text style={[styles.content]}>{content}</Text>
        </View>
        <Text style = {[styles.content,{textAlign : isOwnMessage ? 'right' : 'left', color: '#917F99'}]}>{time}</Text>
      </View>
    )
  };

  return (
    <View style={styles.view}>
      <FlatList
        inverted={true}
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <Item
            content = {item.content}
            ID_sender = {item.ID_sender}
            time_stamp = {item.time_stamp}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <View style = {styles.send}>
        <View style={{flex: 1}}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Введите сообщение"
            placeholderTextColor='#917F99'
            style={styles.input}
          />
        </View>
        <Button color= '#DF2600'title=">>" onPress={sendMessage} />
      </View>
      
    </View>
  );
}

/*const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10 
  },

  send:{
    flexDirection: 'row',
    padding: 8,
    //backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },

  input: { 
    flex: 1,
    borderWidth: 1, 
    borderColor: '#ccc', 
    
  },
  message: { 
    flex: 1,
    paddingBottom: 10,
    //borderRadius: 25,
    //margin: 5,
    //backgroundColor: "#808080",
    //maxWidth: '70%',
    //fontSize: 16
  },
  border: {
    //flex: 1,
    padding: 10,
    borderRadius: 25,
    margin: 5,
    backgroundColor: "#808080",
    maxWidth: '70%',
  },
  own_message: {
    alignSelf: 'flex-end', 
  },
  smo_message: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
  }
});*/
