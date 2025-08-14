import  React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
import { selectClass } from '../DB/appel';

const RegistrationTutor = ({navigation}) => {
    const [name, setName] = useState(null);
    const [mail, setMail] = useState(null);
    const [hours, setHours] = useState(null);

    const [discipline, setDiscipline] = useState(null);

    let [disciplines, setDisciplines] = useState([]);

    const AddIntoStudent = () => {
        if (name != null && mail != null && discipline != null){
            navigation.navigate('password', {name, mail, discipline, hours, role: 'tutor'});
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
                <Text style = {styles.name}>Количество рабочьих часов:</Text>
                <TextInput
                    style={styles.input}
                    value={hours}
                    onChangeText={(value) => setHours(value)}
                    placeholder="Введите количество часов"
                    keyboardType='numeric'
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
            <View style = {styles.transition}>
              <TouchableOpacity onPress={AddIntoStudent} style = {styles.end}><Text style = {styles.end}>Добавить репетитора</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default RegistrationTutor