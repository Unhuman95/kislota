import React, { useContext, useState, useCallback } from 'react'
import {View, FlatList, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import { selectContacts } from '../DB/appel';
import { AuthContext } from '../context';


const ContactList = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [contscts, setContacts] = useState();
  
  const fetchTasks = async () => {
    try {
        const contactList = await selectContacts(user.ID_user, user.role);
        setContacts(contactList);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
  };

  useFocusEffect(
      useCallback(() => {
          fetchTasks();
      }, [])
  );

  const handlePress = (name, id) => {
    navigation.navigate('chat_screen', {name, id});
  }

  return (<View style={styles.container}>
    <FlatList
      data={contscts}
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
    />
  </View>
  )
};

const Item = ({ name, id, last_message, time_stamp, handlePress }) => { 
  const date = new Date(time_stamp);
  const isoString = date.toISOString();
  const time = isoString.slice(11, 16);

  return(
  <TouchableOpacity style={styles.item} onPress = {() => handlePress(name, id)}>
    {/*<Image
      source = {{uri: image}}
      style = {styles.avatar}
      resizeMode={'contain'}/>*/}
    <View style = {styles.text}>
      <Text style = {styles.name}>{name}</Text>
      <View style = {styles.last}>
        <Text style = {styles.massage}>{last_message}</Text>
        <Text style = {{alignSelf: 'flex-end'}}>{time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#888888',
    padding: 10,
    margin: 8,
    borderRadius: 25,
    //marginHorizontal: 16,
  },
  name: {
    fontSize: 18,
  },
  massage: {
    fontSize: 16,
    maxWidth: 300,
    //backgroundColor: '#000000',
  },
  avatar: {
		width: 50,
		height: 50,
		borderRadius: 15,
	},
  last: {
    flex: 1,
    //backgroundColor: '#000000',
    flexDirection: 'row',
    opacity: 0.5,
    justifyContent: 'space-between',
    maxHeight: 25,
  },
});

export default ContactList;