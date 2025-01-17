import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useRole } from '../context';

const rolesPermissions = {
    methodologist: ['add_lesson', 'update_lesson', 'update_course', 'delete_student'],
    student: ['registration', 'add_course'],
    tutor: ['add_task', 'update_task']
}

const hasPermission = (role, action) => {
    const permissions = rolesPermissions[role] || [];
    return permissions.includes(action);
}

const Login = ({navigation}) => {
    const { setRole } = useRole();
    const [role, setSelectedRole] = useState(null);

    const Next = () => {
        setRole(role)
        navigation.navigate('tab_navigation')
    };

    const roles = [{label: 'Методист', value: 'methodologist'}, {label: 'Ученик', value: 'student'}, {label: 'Репетитор', value: 'tutor'}];
    return(
        <View style = {[styles.screen]}>
            <Text style = {[styles.text, styles.title]}>Войдите в систему</Text>
            <View style = {[styles.view]}>
                <RNPickerSelect
                    style={{
                        inputIOS: {
                            color: 'black',  // Цвет текста для iOS
                            margin: 10,
                        },
                        inputAndroid: {
                            color: 'black',  // Цвет текста для Android
                            margin: 10,
                        },
                        }}
                    placeholder={{ label: "Выберете роль", value: null }}
                    onValueChange={(value) => setSelectedRole(value)}
                    items = {roles}
                    value = {role}
                />

                <TouchableOpacity onPress = {Next}><Text style = {[styles.text, styles.next]}>Вход</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        margin: 10,
    },

    title: {
        textAlign: 'center',

    },

    next: {
        color: "#008800",
    }
});

export { Login, hasPermission, rolesPermissions }