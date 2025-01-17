import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRole } from '../context'

const Extra = ({navigation}) => {
    const { role } = useRole();
    return (
        <View style = {styles.view}>
            {role === 'student' && (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('profile_settings')} style = {styles.element}>
                        <Text style = {styles.text}>Настройки профиля</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('add_course')} style = {styles.element}>
                        <Text style = {styles.text}>Добавить курс</Text>
                    </TouchableOpacity>
                </View>
            )}
            {role === 'methodologist' && (
                <TouchableOpacity onPress={() => navigation.navigate('create_schedule')} style = {styles.element}>
                    <Text style = {styles.text}>Создать расписание</Text>
                </TouchableOpacity>
            )}
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
        //backgroundColor: "#000000",
    }
}) 

export default Extra