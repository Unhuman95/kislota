import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
import { addAboniment, selectClass, selectTraining } from '../DB/appel';

const Registration = ({navigation}) => {
    const [name, setName] = useState(null);
    const [mail, setMail] = useState(null);
    const [course, setCourse] = useState(null);
    const [comment, setComent] = useState(null);

    const [discipline, setDiscipline] = useState(null);
    const [purpose, setPurpose] = useState(null);

    let [disciplines, setDisciplines] = useState([]);
    let [purposes, setPurposes] = useState([]);

    const AddIntoStudent = () => {
        if (name != null && mail != null && course != null && discipline != null && purpose != null){
            addAboniment( name, mail, course, comment, discipline, purpose );
            navigation.goBack();
        }else
            Toast.show({
                type: 'error',
                text1: 'Введите все необходимые данные',
            });
    }

    useEffect(() => {
        const search = async() =>{
            const disciplinesList = await selectClass();
            const disciplinesItem = disciplinesList.map((item) => ({
                label: item.title_class,
                value: item.ID_class,
              }));
            setDisciplines(disciplinesItem);
            
            const purposesList = await selectTraining();
            const purposesItem = purposesList.map((item) => ({
                label: item.title_training,
                value: item.ID_training,
              }));
            setPurposes(purposesItem);
        };
        
        search()
    }, []);

    return(
        <View style = {[styles.view]}>
            <View>
                <Text style = {styles.name}>ФИО:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(value) => setName(value)}
                    placeholder="Введите ФИО"
                    placeholderTextColor='#917F99'
                />
            </View>
            <View>
                <Text style = {styles.name}>E-Mail:</Text>
                <TextInput
                    style={styles.input}
                    value={mail}
                    onChangeText={(value) => setMail(value)}
                    placeholder="Введите E-mail"
                    placeholderTextColor='#917F99'
                />
            </View>
            <View>
                <Text style = {styles.name}>Класс:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={course}
                    onChangeText={(value) => setCourse(value)}
                    placeholder="Введите класс"
                    placeholderTextColor='#917F99'
                />
            </View>
            <View>
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
            <View>
                <Text style = {styles.name}>Направление подготовки:</Text>
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
                    placeholder={{ label: "Цель обращения", value: null }}
                    onValueChange={(value) => setPurpose(value)}
                    items = {purposes}
                    value={purpose}
                    />
            </View>
                
            <View>
                <Text style = {styles.name}>Комментарии:</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    value={comment}
                    onChangeText={(value) => setComent(value)}
                    placeholder="Введите комментарий"
                    placeholderTextColor='#917F99'
                />
            </View>
            <View style = {styles.transition}>
              <TouchableOpacity onPress={AddIntoStudent} style = {styles.end}><Text style = {styles.end}>Попробовать пробный урок</Text></TouchableOpacity>
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

export default Registration