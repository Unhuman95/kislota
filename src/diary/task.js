import React, { useState } from 'react';
import {Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import  CheckBox  from '@react-native-community/checkbox'
import { useRole } from '../context'
import { hasPermission } from '../login/login';

import { isComplete } from '../DB/data_base';

export default function Task(props) {
    const { date, task, navigation } = props;

    const { role } = useRole();

    const handleLongPress = (item) => {
      if (hasPermission(role, 'update_task')) {
        navigation.navigate('edit_task', { item });
      }
    };

    const Item = ({ID_task, ID_lesson, discipline, teacher, kid, description, rating, complite, date, }) => {
      if (complite === 1) setIsChecked(true);
      rating = Number(rating)
    
      return(
        <TouchableOpacity style = {[styles.task]}
          onLongPress={() => handleLongPress({ID_task, ID_lesson, discipline, teacher, kid, description, date, rating})}>
          <View style = {[styles.column]}>
            <Text>{discipline}</Text>
            <Text>{kid}</Text>
            <Text>{description}</Text>
          </View>
          <View style = {[styles.column]}>
            <View style = {[styles.table]}>
              <Text>Оценка:</Text></View>
            <View style = {[styles.table]}>
              <Text style = {styles.element}>{rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
    )};

    return (
      <View style = {[styles.container]}>
        <Text>{date}</Text>
        <View>
          <FlatList
                data = {task}
                renderItem = {({item}) => <Item
                  ID_task = {item.ID_task}
                  date = {item.date} 
                  discipline = {item.discipline} 
                  teacher = {item.teacher} 
                  kid = {item.kid} 
                  description = {item.description} 
                  rating = {item.rating} 
                  complite = {item.complite}/>}
                scrollEnabled = {false}
                keyExtractor={(item, index) => index.toString()}
              />
        </View>
      </View>
    );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#808080",
    margin: 5,
    flexDirection: 'column',

  },

  task: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 3,
    fontSize: 28,
    flexDirection: 'row'
  },

  column:{
    flex: 0.5,
    fontSize: 16,
    margin: 5,
    //justifyContent: 'space-around'
    //backgroundColor: '#000000',
  },

  table: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    //backgroundColor: '#ffffff',
    justifyContent: 'space-around'
  },

  complete: {
    flexwrap: 'wrap'
  },

  element: {
    borderStyle: "solid",
    //borderWidth: 1,
  }
};