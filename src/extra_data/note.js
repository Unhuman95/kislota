import React, { useContext, useState, useCallback } from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import { AuthContext } from '../context';
import { selectData } from '../DB/appel';

export default function Note({route, navigation}) {
    const { user } = useContext(AuthContext);
    const { ID_course, kid, teacher, title, link } = route.params;

    const [notes, setNotes] = useState();
    const [newLink, setNewLink] = useState(link);

    const fetchTasks = async () => {
      try {
          const data = await selectData(ID_course);
          setNotes(data);
      } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
      }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const handlePress = () => {
      navigation.navigate('add_data', { kid, title, ID_course });
    }; 

    const handleLongPress = ({ID_note, title_note, discription}) => {
      if(user.role == 'tutor') navigation.navigate('edit_data', {ID_note, title_note, discription, kid, title});
    };

    return (
      <View style = {[styles.container]}>
        <View style = {[styles.title]}>
          <Text style = {[styles.text , {fontWeight: 600}]}>{ title }</Text>
          <Text style = {[styles.text]}>Репетитор: { teacher }</Text>
          <Text style = {[styles.text]}>Ученик: { kid }</Text>
          <View style= {[styles.link]}>
            <Text style = {[styles.text, {margin:5}]}>Ссылка:</Text>
            <TextInput
              style={styles.input}
              value={newLink}
              onChangeText={(value) => setNewLink(value)}/>
              
          </View>
          
        </View>
        <View style = {[styles.schedule]}>
          <FlatList
            keyExtractor={(item) => item.ID_note.toString()}
            data = {notes}
            renderItem = {({item}) => <Item 
              ID_note = {item.ID_note}
              discription = {item.discription}
              title_note = {item.title_note}
              handleLongPress = {handleLongPress}
              />}
          />
        </View>
        {user.role === 'tutor' && (
          <View>
            <View style = {{flex: 1}}/>
            <TouchableOpacity style = {{margin: 10}} onPress={() => handlePress()}><Text style = {[styles.end]}>Добавить заметку</Text></TouchableOpacity>
          </View>
        )}
      </View>
    );
}

const Item = ({ ID_note, discription, title_note, handleLongPress }) => {

  return(
    <TouchableOpacity
        onLongPress={() => handleLongPress({ID_note, discription, title_note})}>
      <View style = {styles.element}>
          <Text style = {[styles.text, {fontWeight: 600}]}>{title_note}</Text>
          <Text style = {[styles.text]}>{discription}</Text>
      </View>
    </TouchableOpacity>
)};

const styles = StyleSheet.create({
  title: {
    flex: 0.5,
    margin: 5,
    alignItems: 'center'
  },
  schedule: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 3,
  },
  text: {
    //margin: 5,
    fontSize: 18,
    //flex: 1,
    //backgroundColor: '#000000',
    padding: 5,
    //margin: 5,
  },
  input: {
    color: "#000000",
    fontSize: 18,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  link: {
    //flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    //backgroundColor: "#808080",
    margin: 5,
    flexDirection: 'column'
  },
  element: {
    backgroundColor: '#808080',
    padding: 5,
    margin: 5,
    flex: 1,
    borderRadius: 5
  },
  end: {
    textAlign: "center",
    fontSize: 20,
    color: "#008800"
  },
})