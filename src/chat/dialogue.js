import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
 
import { AuthContext } from '../context';
import { selectMessages, } from '../DB/appel';


export default function ChatScreen({route, navigation}) {
  const { user, socket } = useContext(AuthContext);

  const {name, id} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
      navigation.setOptions({
        title: name,
      });
  }, [navigation, name]);

  useEffect(() => {
    const fetchMessages = async() =>{
      const messagesList = await selectMessages(user.ID_user, id);
      setMessages(messagesList);
    };
    fetchMessages();

    socket.on('receive_message', msg => {
      if (
        (msg.ID_sender === user.ID_user && msg.ID_receiver === id) ||
        (msg.ID_sender === id && msg.ID_receiver === user.ID_user)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });
  
  }, []);

  const sendMessage = () => {
    const msgData = {
      ID_sender: user.ID_user,
      ID_receiver: id,
      content: message
    };
    socket.emit('send_message', msgData);
    setMessage('');
  };

  const Item = ({ content, ID_sender }) => {
    return (
      <View style={[styles.message, { alignSelf: ID_sender === user.ID_user ? 'flex-end' : 'flex-start' }]}>
        <Text style={[styles.text]}>
            {content}
          </Text>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Item
            content = {item.content}
            ID_sender = {item.ID_sender}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style = {styles.send}>
        
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Введите сообщение"
          style={styles.input}
        />
        <Button title=">>" onPress={sendMessage} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 10,
    borderRadius: 25,
    margin: 5,
    backgroundColor: "#808080",
    maxWidth: '70%',
    //fontSize: 16
  },
  text: {
    fontSize: 16,
  }
});
