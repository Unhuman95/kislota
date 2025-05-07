import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

import { AuthContext } from '../context';
import { connectSocket } from '../DB/appel';

const Login = ({navigation}) => {
    const { signIn, loading, user } = useContext(AuthContext);

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const Next = () => {
        signIn(login, password);

        if (!loading) {
            navigation.navigate('tab_navigation');
        }
    };

    const LogUp = () => {
        navigation.navigate('registration');
    };

    return(
        <View style = {[styles.screen]}>
            <View style = {[styles.table]}>
                <Text style = {[styles.text, styles.In]}>Войдите в систему</Text>
                </View>
            <View style = {[styles.view]}>

                <View style = {styles.conteiner}>
                    <Text style = {styles.title}>Логин:</Text>
                    <TextInput
                        style={styles.input}
                        value={login}
                        onChangeText={(value) => setLogin(value)}
                    />
                </View>

                <View style = {styles.conteiner}>
                    <Text style = {styles.title}>Пароль:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>

                <TouchableOpacity onPress = {Next}><Text style = {[styles.text, styles.next]}>Вход</Text></TouchableOpacity>
                <TouchableOpacity onPress = {LogUp}><Text style = {[styles.text, styles.next]}>Регистрация</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
    },

    table: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 10
    },

    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    text: {
        fontSize: 20,
        margin: 10,
    },

    conteiner: {
        //flex: 1,
        margin: 10,
    },

    In: {
        textAlign: 'center',

    },

    title: {
        fontSize: 18,
        textAlign: 'left'
    },

    input: {
        color: "#000000",
    },

    next: {
        color: "#008800",
    }
});

export default Login