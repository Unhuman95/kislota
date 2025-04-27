import React, { useContext, useState, useCallback } from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from '../context';

import { selectData } from '../DB/appel';

export default function Note({route, navigation}) {
    const { ID_course, kid, teacher, title } = route.params;
    const [notes, setNotes] = useState();

    const { user } = useContext(AuthContext);

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

    const handleLongPress = ({ID_data, title_data, discription}) => {
      if(user.role == 'tutor') navigation.navigate('', ID_data, title_data, discription);
    };

    return (
      <View style = {[styles.container]}>
        <View style = {[styles.title]}>
          <Text style = {[styles.text]}>{ title }</Text>
          <Text style = {[styles.text]}>Репетитор: { teacher }</Text>
          <Text style = {[styles.text]}>Ученик: { kid }</Text>
        </View>
        <View style = {[styles.schedule]}>
          <FlatList
            keyExtractor={(item) => item.ID_data.toString()}
            data = {notes}
            renderItem = {({item}) => <Item 
              ID_data = {item.ID_data}
              discription = {item.discription}
              title_data = {item.title_data}
              handleLongPress = {handleLongPress}
              />}
          />
        </View>
      </View>
    );
}

const Item = ({ ID_data, discription, title_data, handleLongPress }) => {

  return(
    <TouchableOpacity
        onLongPress={() => handleLongPress({ID_data, discription, title_data})}>
      <View>
          <Text>{title_data}</Text>
          <Text>{discription}</Text>
      </View>
    </TouchableOpacity>
)};

const styles = StyleSheet.create({
  title: {
    //flex: 0.5,
    height: 90,
  },
  lesson:{
    fontSize: 16,
    margin: 5,
  },
  schedule: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 3,
  },
  text: {
      flex: 0.5,
      margin: 5,
      flexWrap: 'wrap',
      height: 50
  },
  discipline: {
    fontSize: 22,
    textAlign: 'left',
  },
  count: {
    fontSize: 20,
    textAlign: 'right',
  },
  teacher: {
    fontSize: 14,
    textAlign: 'left',
  },
  kid: {
    fontSize: 14,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    //backgroundColor: "#808080",
    margin: 5,
    flexDirection: 'column'
  },
  column: {
    flex: 1,
    backgroundColor: "#808080",
    flexDirection: 'row'
  }
})