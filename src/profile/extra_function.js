import React, { useContext } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AuthContext } from '../context';
import { CommonActions } from '@react-navigation/native';

const Extra = ({navigation}) => {
    const { user, logout } = useContext(AuthContext);

    const signOut = async () => {
        await logout();
        //setUser(null); 
    };

    return (
        <View style = {styles.view}>
            <TouchableOpacity onPress={() => navigation.navigate('profile_settings')} style = {styles.element}>
                <Text style = {styles.text}>Настройки профиля</Text>
            </TouchableOpacity>
            {user && user.role === 'student' && (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('add_course')} style = {styles.element}>
                        <Text style = {styles.text}>Добавить курс</Text>
                    </TouchableOpacity>
                </View>
            )}
            {user && (user.role === 'methodologist') && (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('create_schedule')} style = {styles.element}>
                        <Text style = {styles.text}>Создать расписание</Text>
                    </TouchableOpacity>
                </View>
            )}
            {user && (user.role === 'methodologist' || user.role === 'tutor') && (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('student_list')} style = {styles.element}>
                        <Text style = {styles.text}>Список студентов</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={{flex: 1}}/>
            <View>
                <TouchableOpacity style = {{margin: 20}} onPress={signOut}><Text style = {styles.end}>Выход</Text></TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    },
    view: {
        flex: 1,
        flexDirection: "column",

    },
    element: {
        margin: 10,
    },
    end: {
        textAlign: "center",
        fontSize: 20,
        color: "#008800",
    }
}) 

export default Extra