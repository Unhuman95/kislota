import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
import { addAboniment, addTutor } from '../DB/appel';

const CreatePassword = ({route, navigation}) => {
    const { role } = route.params

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const AddInto = () => {
        if (password !== confirmPassword){
            Toast.show({
                    type: 'error',
                    text1: 'Пароли не совпадают!',
                });
            return;
        }
        if (role === 'student' ){
            let { name, mail, course, comment, discipline, purpose } = route.params;
            addAboniment( name, mail, course, comment, discipline, purpose, password );

            navigation.pop(2);
        }else{
            let { name, mail, discipline, hours } = route.params;
            addTutor( name, mail, discipline, hours, password );

            navigation.goBack();
        }  
    }

    return(
        <View style= {styles.view}>
            <View style = {styles.action}>
                <View style = {styles.element}>
                    <Text style = {styles.info}>Пароль:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите пароль"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor='#917F99'
                    />
                </View>
                <View style = {styles.element}>
                    <Text style = {styles.info}>Подтверждение пароля:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Повторите пароль"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor='#917F99'
                    />
                </View>
            </View>
            <View style = {styles.transition}>
                <TouchableOpacity onPress={() => AddInto(password, confirmPassword)}><Text style = {[styles.end]}>Сохранить пароль</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default CreatePassword