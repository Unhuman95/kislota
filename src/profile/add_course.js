import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { addCourse, selectClass, selectTraning, selectStudents } from '../DB/data_base';

const AddIntoCourse = ({navigation}) => {
    const [kid, setKid] = useState(null);

    const [discipline, setDiscipline] = useState(null);
    const [purpose, setPurpose] = useState(null);

    let [kids, setKids] = useState([]);
    let [disciplines, setDisciplines] = useState([]);
    let [purposes, setPurposes] = useState([]);

    const IntoCourse = () => {
        addCourse({ kid, discipline, purpose });
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

            const disciplinesList = await selectClass();
            const disciplinesItem = disciplinesList.map((item) => ({
                label: item.title_class,
                value: item.ID_class,
              }));
            setDisciplines(disciplinesItem);
            
            const purposesList = await selectTraning();
            const purposesItem = purposesList.map((item) => ({
                label: item.title_traning,
                value: item.ID_traning,
              }));
            setPurposes(purposesItem);
        };
        
        search()
    }, []);

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
                <Text style = {styles.title}>Направление подготовки:</Text>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                          color: 'black',  // Цвет текста для iOS
                        },
                        inputAndroid: {
                          color: 'black',  // Цвет текста для Android
                        },
                      }}
                    placeholder={{ label: "Цель обращения", value: null }}
                    onValueChange={(value) => setPurpose(value)}
                    items = {purposes}
                    value={purpose}
                    />
            </View>
            <View style={{flex: 1}} />
            <View>
              <TouchableOpacity onPress={IntoCourse} style = {{margin: 10}}><Text style = {styles.end}>Попробовать пробный урок</Text></TouchableOpacity>
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

export default AddIntoCourse