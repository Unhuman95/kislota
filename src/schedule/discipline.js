import * as React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useRole } from '../context';
import { hasPermission } from '../login/login';


export default function Discipline(props) {
    const { title, count, teacher,  kid, style, lesson, navigation} = props;
    const { role } = useRole();

    const handleLongPress = ({id_lesson, day, time}) => {
      if (hasPermission(role, 'update_lesson')) {
          navigation.navigate('edit_schedule', { id_lesson, day, time, title, teacher, kid, navigation });
      }    
    };

    const Item = ({ id_lesson, day, time }) => {
      const dayWeek = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота',]
      return(
        <View>
          <TouchableOpacity style = {[styles.list]}
            onLongPress={() => handleLongPress({id_lesson, day, time})}>
              <Text style = {[styles.lesson]}>{dayWeek[day]} - {time}</Text>
          </TouchableOpacity>
        </View>
    )};

    return (
      <View style = {[styles.container, style]}>
        <View style = {[styles.column, style]}>
          <Text style = {[styles.discipline, styles.text]}>{title}</Text> 
          <Text style = {[styles.count, styles.text]}>{count}</Text>
        </View>
        <View style = {[styles.column, style]}>
          <Text style = {[styles.teacher, styles.text]}>Репетитор: {teacher}</Text>
          <Text style = {[styles.kid, styles.text]}>Ученик: {kid}</Text>
        </View>
        <View style = {[styles.schedule, style]}>
          <FlatList
            data = {lesson}
            renderItem = {({item}) => <Item day = {item.day} time = {item.time} id_lesson={item.ID_lesson}/>}
            scrollEnabled = {false}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
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