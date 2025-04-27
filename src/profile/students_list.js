import React, { useContext, useState, useCallback } from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from '../context';

import { selectStudents } from '../DB/appel';

export default function StudentList({ navigation }) {
    const [students, setStudents] = useState();

    const { user } = useContext(AuthContext);

    const fetchTasks = async () => {
      try {
          const studentList = await selectStudents();
          setStudents(studentList);
      } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
      }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const handleLongPress = ({ID_student, full_name, Email, phone_number, school_class}) => {
      navigation.navigate('student', {ID_student, full_name, Email, phone_number, school_class});
    };

    return (
      <View style = {[styles.container]}>
        <View style = {[styles.schedule]}>
          <FlatList
            keyExtractor={(item) => item.ID_user.toString()}
            data = {students}
            renderItem = {({item}) => <Item 
              ID_student = {item.ID_user}
              full_name = {item.full_name}
              Email = {item.Email}
              phone_number = {item.phone_number}
              school_class = {item.school_class}
              handleLongPress = {handleLongPress}
              />}
          />
        </View>
      </View>
    );
}

const Item = ({ ID_student, full_name, Email, phone_number, school_class, handleLongPress }) => {

  return(
    <TouchableOpacity
        onPress={() => handleLongPress({ID_student, full_name, Email, phone_number, school_class})}>
      <View style = {styles.item}>
          <Text style = {styles.text}>{full_name}</Text>
      </View>
    </TouchableOpacity>
)};

const styles = StyleSheet.create({
  schedule: {
    flex: 1,
    margin: 5,
    padding: 3,
  },
  item: {
    margin: 5,
    padding: 8,
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 18,
},
  container: {
    flex: 1,
    //backgroundColor: "#808080",
    margin: 5,
    flexDirection: 'column'
  },
})