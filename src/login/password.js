import  React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

import { addAboniment } from '../DB/appel';

const CreatePassword = ({route, navigation}) => {
    const { name, mail, course, comment, discipline, purpose } = route.params;

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

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

    return(
        <View style= {styles.passChange}>
            <TextInput
                placeholder="Введите пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder="Подтвердите пароль"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Сохранить пароль" onPress={() => AddIntoStudent(password, confirmPassword)} />
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

export default CreatePassword