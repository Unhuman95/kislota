import React, { useContext } from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import styles from '../../design/style';
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
          else navigation.navigate('edit_schedule', { ID_lesson, day, time, title, teacher, kid, date_postponed_lesson });
          break;
      }
    };

    return (
      <View style = {[styles.container]}>
        <View style = {[{margin: 5}]}>
          <View style = {[styles.column]}>
            <Text style = {[styles.left_up, styles.text]}>{title}</Text> 
            <Text style = {[styles.right_up, styles.text]}>{count}</Text>
          </View>
            <View style = {[styles.column]}>
            <Text style = {[styles.left_bottom, styles.text]}>Репетитор: {teacher}</Text>
            <Text style = {[styles.right_bottom, styles.text]}>Ученик: {kid}</Text>
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
          <Text style = {[styles.list, { color: postponed == 1 ? '#FF3C14' : '#000000' }]}>{dayWeek[day]} - {time}</Text>
      </TouchableOpacity>
    </View>
)};

