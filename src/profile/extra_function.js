import React, { useContext } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import styles from '../../design/style';
import { AuthContext } from '../context';

const Extra = ({navigation}) => {
    const { user, logout } = useContext(AuthContext);

    const signOut = async () => {
        await logout();
    };

    return (
        <View style = {styles.view}>
            <View style= {{flex:1}}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('profile_settings_stack')} style = {styles.element}>
                        <Text style = {styles.func}>Настройки профиля</Text>
                    </TouchableOpacity>
                </View>
                {user && user.role === 'student' && (
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('add_course')} style = {styles.element}>
                            <Text style = {styles.func}>Добавить курс</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {user && (user.role === 'methodologist') && (
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('create_schedule')} style = {styles.element}>
                            <Text style = {styles.func}>Создать расписание</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {user && (user.role === 'methodologist' || user.role === 'tutor') && (
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('student_list_stack')} style = {styles.element}>
                            <Text style = {styles.func}>Список студентов</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style = {[styles.transition]}>
                <TouchableOpacity onPress={signOut}><Text style = {styles.end}>Выход</Text></TouchableOpacity>
            </View>
        </View>
    )
}


/*const styles = StyleSheet.create({
    name: {
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
}) */

export default Extra