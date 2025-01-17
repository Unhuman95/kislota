import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addTask, selectStudents, selectClassWithID } from '../DB/data_base';

const Add = ({ navigation }) => {
    const [discipline, setDiscipline] = useState(null);
    const [date, setDate] = useState(new Date());
    const [kid, setKid] = useState(null);
    const [description, setDescription] = useState(null);

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    let [disciplines, setDisciplines] = useState([]);
    let [kids, setKids] = useState([]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const AddIntoTask = () => {
        addTask({discipline, kid, description, date});
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

    return(
        <View style = {[styles.list]}>
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
                    items = {kids}
                    value = {kid}
                    />
            </View>
                
            <View>
                <Text style = {styles.title}>Описание задания:</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(value) => setDescription(value)}
                    value = {description}
                />
            </View>
            <View>
                <Text style = {styles.title}>Крайний срок:</Text> 
                <Button color = {"#808080"} onPress={() => showMode('date')} title="Выбрать дату"/>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode={"date"}
                        display="default"
                        onChange={onChange}
                    />
                )}              
            </View>
            <View style={{flex: 1}} />
            <View>
              <TouchableOpacity onPress={AddIntoTask} style = {{margin: 10}}><Text style = {styles.end}>Добавить</Text></TouchableOpacity>
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

export default Add