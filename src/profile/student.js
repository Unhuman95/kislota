import React, { useContext, useState, useCallback, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from '../context';

import { selectClassWithID, selectTutors, updateTutor } from '../DB/appel';

export default function Student({route, navigation}) {
    const { ID_student, full_name, Email, phone_number, school_class } = route.params;
    const [courses, setCourses] = useState();
    
    const { user } = useContext(AuthContext);

      const fetchTasks = async () => {
        try {
          const courseList = await selectClassWithID(ID_student);
          setCourses(courseList);
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      };
  
    useFocusEffect(
        useCallback(() => {
      fetchTasks();
        }, [])
    );
  
    const Item = ({ ID_class, title, training, teacher, ID_course }) => {
      const [tutors, setTutors] = useState([]);
      const [tutor, setTutor] = useState(teacher);

      const [visible, setVisible] = useState(false);

      useEffect(() => {
        const fetchTutors = async () => {
          if (visible) { 
            const teachersList = await selectTutors(ID_class);
            const teachersItem = teachersList.map((item) => ({
              label: item.full_name,
              value: item.ID_user,
      }));
      setTutors(teachersItem);
            console.log(tutors);
          }
        };
      
        fetchTutors();
      }, [visible]);

      const update = () => {
        updateTutor(ID_course, tutor, ID_class);
        //Alert('Репетитор изменен');
      }

      return(
        <View>
          <TouchableOpacity onPress={() => setVisible(prev => !prev)}>
            <View style = {styles.element}>
              <Text style={styles.text}>{title}</Text>
              <Text style={styles.text}>{training}</Text>
        </View>
          </TouchableOpacity>
          {visible && tutors && tutors.length > 0 && user.role === 'methodologist' && (
            <View style={{ marginTop: 10 }}>
              <RNPickerSelect
                style={{
                  inputIOS: { color: 'black' },
                  inputAndroid: { color: 'black' },
                }}
                placeholder={{ label: "Выберете репетитора", value: null }}
                onValueChange={(value) => setTutor(value)}
                value={tutor}
                items={tutors}
              />
              <Button onPress = {() => update()} title="Изменить"/>
            </View>
          )}
          </View>
    )};

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>Ученик: {full_name}</Text>
          <Text style={styles.text}>Класс: {school_class}</Text>
          <Text style={styles.text}>Email: {Email}</Text>
          <Text style={styles.text}>Телефон: {phone_number}</Text>
        </View>
        <ScrollView style={styles.schedule}>
          {courses && courses.map((item) => (
            <Item
              key={item.ID_class.toString()}
              ID_class={item.ID_class}
              title={item.title_class}
              training={item.title_training}
              teacher={item.ID_tutor}
              ID_course={item.ID_course}
            />
          ))}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  title: {
    margin: 5,
    flex: 0.5,
  },
  schedule: {
    flex: 1,
    margin: 5,
    padding: 3,
  },
  text: {
      margin: 5,
      fontSize: 18,
      flex: 1,
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
    flexDirection: 'row',
    borderRadius: 5
  },
})