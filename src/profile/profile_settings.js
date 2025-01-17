import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { addAboniment, addCourse, selectClass, selectTraning } from '../DB/data_base';

const ProfileSettings = ({navigation}) => {
    const [name, setName] = useState(null);
    const [mail, setMail] = useState(null);
    const [course, setCourse] = useState(null);
    const [comment, setComent] = useState(null);

    const [discipline, setDiscipline] = useState(null);
    const [purpose, setPurpose] = useState(null);

    let [disciplines, setDisciplines] = useState([]);
    let [purposes, setPurposes] = useState([]);

    const AddIntoStudent = () => {
        addAboniment({ name, mail, course, comment, discipline, purpose });
        navigation.goBack();
    }

    useEffect(() => {
        const search = async() =>{
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
                <Text style = {styles.title}>ФИО:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
            </View>
            <View>
                <Text style = {styles.title}>E-Mail:</Text>
                <TextInput
                    style={styles.input}
                    value={mail}
                    onChangeText={(value) => setMail(value)}
                />
            </View>
            <View>
                <Text style = {styles.title}>Класс:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={course}
                    onChangeText={(value) => setCourse(value)}
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
                
            <View>
                <Text style = {styles.title}>Комментарии:</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    value={comment}
                    onChangeText={(value) => setComent(value)}
                />
            </View>
            <View style={{flex: 1}} />
            <View>
              <TouchableOpacity onPress={AddIntoStudent} style = {{margin: 10}}><Text style = {styles.end}>Попробовать пробный урок</Text></TouchableOpacity>
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

export default ProfileSettings