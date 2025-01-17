import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import { selectStudents, selectClassWithID, selectTutorWithID, addLesson } from '../DB/data_base';

const CreateSchedule = ({navigation}) => {
    const [kid, setKid] = useState(null);  
    const [discipline, setDiscipline] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(new Date());

    const [kids, setKids] = useState([]);  
    const [disciplines, setDisciplines] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setTime(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const AddIntoLesson = () => {
      addLesson({discipline, kid, teacher, time, day});
      navigation.goBack();
  }

    useEffect(() => {
            const search = async() =>{
                const kidsList = await selectStudents();
                const kidsItem = kidsList.map((item) => ({
                    label: item.full_name_student,
                    value: item.ID_student,
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
                  label: item.full_name_tutor,
                  value: item.ID_tutor,
                }));
                setTeachers(teachersItem);
              }
            };
          
            fetchTeachers();
          }, [discipline, kid]);

    const days = [{label: "Воскресенье", value: 0}, {label: "Понедельник", value: 1}, {label: "Вторник", value: 2}, {label: "Среда", value: 3}, {label: "Четверг", value: 4}, {label: "Пятница", value: 5}, {label: "Суббота", value: 6},];
    return(
        <View style = {[styles.list]}>
            <View>
                <Text style = {styles.title}>Ученик:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: 'black',  // Цвет текста для iOS
                        },
                        inputAndroid: {
                          color: 'black',  // Цвет текста для Android
                        },
                      }}
                    placeholder={{ label: "Выберете ученика", value: null }}
                    onValueChange={(value) => setKid(value)}
                    value={kid}
                    items = {kids}
                    />
            </View>
            <View>
                <Text style = {styles.title}>Дисциплина:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: 'black',  // Цвет текста для iOS
                        },
                        inputAndroid: {
                          color: 'black',  // Цвет текста для Android
                        },
                      }}
                    placeholder={{ label: "Выберете предмет", value: null }}
                    onValueChange={(value) => setDiscipline(value)}
                    items = {disciplines}
                    value = {discipline}
                    />
            </View>
            <View>
                <Text style = {styles.title}>Репетитор:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: 'black',  // Цвет текста для iOS
                        },
                        inputAndroid: {
                          color: 'black',  // Цвет текста для Android
                        },
                      }}
                    placeholder={{ label: "Выберете репетитора", value: null }}
                    onValueChange={(value) => setTeacher(value)}
                    items = {teachers}
                    value={teacher}
                    />
            </View>
            <View>
                <Text style = {styles.title}>День недели:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: 'black',  // Цвет текста для iOS
                        },
                        inputAndroid: {
                          color: 'black',  // Цвет текста для Android
                        },
                      }}
                    placeholder={{ label: "Выберете день недели", value: null }}
                    onValueChange={(value) => setDay(value)}
                    items = {days}
                    value = {day}
                    />
            </View>
                
            <View>
                <Text style = {styles.title}>Время проведения:</Text> 
                <Button color = {"#808080"} onPress={() => showMode('time')} title="Выбрать время" />
                {show && (
                    <DateTimePicker
                        value={time}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                )}              
            </View>
            <View style={{flex: 1}} />
            <View>
              <TouchableOpacity onPress={AddIntoLesson} style = {{margin: 10}}><Text style = {styles.end}>Добавить</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
});

export default CreateSchedule