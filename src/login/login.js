import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
import { AuthContext } from '../context';

const Login = ({navigation}) => {
    const { signIn, loading, user } = useContext(AuthContext);

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const Next = () => {
        if (login != null && password != null){
            signIn(login, password);

            if (!loading && user != null) {
                navigation.navigate('tab_navigation');
            }}
        else {
            Toast.show({
                type: 'error',
                text1: 'Введите логин и пароль!',
            });
            }
    };

    const LogUp = () => {
        navigation.navigate('registration');
    };

    return(
        <View style = {[styles.view]}>
            <View style={{flex:0.5}}>
                <Text style = {[styles.info]}>Войдите в систему</Text>
                </View>
            <View style = {styles.action}>
                <View style = {styles.element}>
                    <Text style = {styles.info}>Логин:</Text>
                    <TextInput
                        style={styles.input}
                        value={login}
                        onChangeText={(value) => setLogin(value)}
                        placeholder="Введите логин"
                        placeholderTextColor='#917F99'
                    />
                </View>

                <View style = {styles.element}>
                    <Text style = {styles.info}>Пароль:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry
                        placeholder="Введите пароль"
                        placeholderTextColor='#917F99'
                    />
                </View>
            </View>
            <View style = {styles.transition}>
                <TouchableOpacity onPress = {Next}><Text style = {[styles.end]}>Вход</Text></TouchableOpacity>
                <TouchableOpacity onPress = {LogUp}><Text style = {[styles.end, {color:'#FF3C14'}]}>Регистрация</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Login