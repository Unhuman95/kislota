import  React, { useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import { selectUser } from '../DB/appel';
import { AuthContext } from '../context';

const ProfileSettings = ({navigation}) => {
    const { user, logout } = useContext(AuthContext);
    const routeName = navigation.getState().routes[navigation.getState().index].name;

    const [name, setName] = useState(null);
    const [mail, setMail] = useState(null);
    const [course, setCourse] = useState(null);
    const [phone, setPhone] = useState(null);

    const fetchTasks = async () => {
        try {
            const dataList = await selectUser(user.ID_user);
            setName(dataList.full_name);
            setMail(dataList.Email);
            setCourse(dataList.class);
            setPhone(dataList.school_class);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );
    
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
                <Text style = {styles.title}>Номер телефона:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={phone}
                    onChangeText={(value) => setPhone(value)}
                />
            </View>
            <View style={{flex: 1}} />
            <View>
                <TouchableOpacity style = {{margin: 10}}><Text style = {styles.end}>Изменить данные</Text></TouchableOpacity>
                
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