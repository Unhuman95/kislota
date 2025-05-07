import React, { useContext } from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import { AuthContext } from '../context';

export default function Discipline(props) {
    const { title, count, teacher,  kid, lesson, navigation} = props;
    const { user } = useContext(AuthContext);

    const handleLongPress = ({ID_lesson, day, time, postponed, date_postponed_lesson}) => {
      switch(user.role) {
        case 'methodologist' :
          if (postponed == 0) navigation.navigate('edit_schedule', { ID_lesson, day, time, title, teacher, kid, date_postponed_lesson });
          break;
        case 'tutor':
          if (postponed == 0) navigation.navigate('reschedule', { ID_lesson, day, time, title, teacher, kid });
          break;
      }
    };

    return (
      <View style = {[styles.container]}>
        <View style = {[styles.title]}>
          <View style = {[styles.column]}>
          <Text style = {[styles.discipline, styles.text]}>{title}</Text> 
          <Text style = {[styles.count, styles.text]}>{count}</Text>
        </View>
          <View style = {[styles.column]}>
          <Text style = {[styles.teacher, styles.text]}>Репетитор: {teacher}</Text>
          <Text style = {[styles.kid, styles.text]}>Ученик: {kid}</Text>
        </View>
        </View>
        <View style = {[styles.schedule]}>
          <FlatList
            keyExtractor={(item) => item.ID_lesson.toString()}
            data = {lesson}
            renderItem = {({item}) => <Item 
              day = {item.day} 
              time = {item.time} 
              ID_lesson = {item.ID_lesson}
              postponed={item.postponed}
              date_postponed_lesson = {item.date_postponed_lesson}
              handleLongPress = {handleLongPress}
              />}
            scrollEnabled = {false}
          />
        </View>
      </View>
    );
}

const Item = ({ ID_lesson, day, time, handleLongPress, postponed, date_postponed_lesson }) => {
  const dayWeek = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота',];

  return(
    <View>
      <TouchableOpacity
        onLongPress={() => handleLongPress({ID_lesson, day, time, postponed, date_postponed_lesson})}>
          <Text style = {[styles.lesson, { color: postponed == 1 ? 'red' : 'black' }]}>{dayWeek[day]} - {time}</Text>
      </TouchableOpacity>
    </View>
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
    //fontSize: 28,
  },
  text: {
      flex: 0.5,
      //backgroundColor: '#ffffff',
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
    backgroundColor: "#808080",
    margin: 5,
    flexDirection: 'column'
  },
  column: {
    flex: 1,
    backgroundColor: "#808080",
    flexDirection: 'row'
  }
})