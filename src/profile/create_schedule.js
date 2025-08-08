import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../../design/style';
import { selectStudents, selectClassWithID, selectTutorWithID, addLesson } from '../DB/appel';

const CreateSchedule = ({navigation}) => {
    const [kid, setKid] = useState(null);  
    const [discipline, setDiscipline] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(new Date());

    const [kids, setKids] = useState([]);  
    const [disciplines, setDisciplines] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        setShow(false);
        setTime(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const AddIntoLesson = async() => {
      const result = await addLesson(
        parseInt(discipline), 
        parseInt(kid), 
        parseInt(teacher), 
        time, 
        day
      );
    if (result) {
        setMessage(result.message);
    }
      navigation.goBack();
  }

    useEffect(() => {
            const search = async() =>{
                const kidsList = await selectStudents();
                const kidsItem = kidsList.map((item) => ({
                    label: item.full_name,
                    value: item.ID_user,
                  }));
                setKids(kidsItem); 
            };
            
            search()
        }, []);
    
        useEffect(() => {
            const fetchDisciplines = async () => {
              if (kid) { // Проверяем, что значение kid задано
                const disciplinesList = await selectClassWithID(kid);
                const disciplinesItem = disciplinesList.map((item) => ({
                  label: item.title_class,
                  value: item.ID_class,
                }));
                setDisciplines(disciplinesItem);
              }
            };
          
            fetchDisciplines();
          }, [kid]);

          useEffect(() => {
            const fetchTeachers = async () => {
              if (discipline) { // Проверяем, что значение kid задано
                const teachersList = await selectTutorWithID({discipline, kid});
                const teachersItem = teachersList.map((item) => ({
                  label: item.full_name,
                  value: item.ID_user,
                }));
                setTeachers(teachersItem);
              }
            };
          
            fetchTeachers();
          }, [discipline, kid]);

    const days = [{label: "Воскресенье", value: 0}, {label: "Понедельник", value: 1}, {label: "Вторник", value: 2}, {label: "Среда", value: 3}, {label: "Четверг", value: 4}, {label: "Пятница", value: 5}, {label: "Суббота", value: 6},];
    return(
        <View style = {[styles.view]}>
            <View style={{marginHorizontal: 20}}>
                <Text style = {styles.name}>Ученик:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: '#FFFFFF',  
                          fontSize: 20, 
                        },
                        inputAndroid: {
                          color: '#FFFFFF',  
                          fontSize: 20,
                        },
                      }}
                    placeholder={{ label: "Выберете ученика", value: null }}
                    onValueChange={(value) => setKid(value)}
                    value={kid}
                    items = {kids}
                    />
            </View>
            <View style={{marginHorizontal: 20}}>
                <Text style = {styles.name}>Дисциплина:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: '#FFFFFF',  
                          fontSize: 20, 
                        },
                        inputAndroid: {
                          color: '#FFFFFF',  
                          fontSize: 20, 
                        },
                      }}
                    placeholder={{ label: "Выберете предмет", value: null }}
                    onValueChange={(value) => setDiscipline(value)}
                    items = {disciplines}
                    value = {discipline}
                    />
            </View>
            <View style={{marginHorizontal: 20}}>
                <Text style = {styles.name}>Репетитор:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: '#FFFFFF',  
                          fontSize: 20, 
                        },
                        inputAndroid: {
                          color: '#FFFFFF',  
                          fontSize: 20, 
                        },
                      }}
                    placeholder={{ label: "Выберете репетитора", value: null }}
                    onValueChange={(value) => setTeacher(value)}
                    items = {teachers}
                    value={teacher}
                    />
            </View>
            <View style={{marginHorizontal: 20}}>
                <Text style = {styles.name}>День недели:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: '#FFFFFF',  
                          fontSize: 20, 
                        },
                        inputAndroid: {
                          color: '#FFFFFF',  
                          fontSize: 20, 
                        },
                      }}
                    placeholder={{ label: "Выберете день недели", value: null }}
                    onValueChange={(value) => setDay(value)}
                    items = {days}
                    value = {day}
                    />
            </View>   
            <View style={{marginHorizontal: 20}}>
                <Text style = {styles.name}>Время проведения:</Text> 
                <Button color = {"#00A8BA"} onPress={() => showMode('time')} title="Выбрать время" />
                {show && (
                    <DateTimePicker
                        value={time}
                        mode= 'time'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}              
            </View>
            <View style = {[styles.transition]}>
              <TouchableOpacity onPress={AddIntoLesson} style = {{margin: 10}}><Text style = {styles.end}>Добавить</Text></TouchableOpacity>
            </View>
        </View>
    )
}

/*const styles = StyleSheet.create({
    button: {
        tintColor: "#808080",
    },
    input: {
        color: "#000000",
    },

    list: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontSize: 18,
    },
    end: {
      textAlign: "center",
      fontSize: 20,
      color: "#008800",
    }
});*/

export default CreateSchedule