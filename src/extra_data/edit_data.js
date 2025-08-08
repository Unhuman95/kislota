import  React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Alert} from 'react-native';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
import { updateNote, deleteNote } from '../DB/appel';

const Edit = ({ route, navigation }) => {
    const { ID_note, title_note, discription, kid, title } = route.params;

    const [newTitleData, setTitleData] = useState(title_note);
    const [newDiscription, setDiscription] = useState(discription);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const UpdateDate = () => {
        if (newTitleData != null && newDiscription != null) {
            Alert.alert(
                'Изменение заметки',
                'Вы уверены, что хотите изменить заметку?',
                [
                    { text: 'Отмена', style: 'cancel' },
                    { text: 'ОК', style: "destructive", onPress: () => {
                        console.log('OK Pressed');
                        updateNote(ID_note, newTitleData, newDiscription);
                    }},
                ],
                { cancelable: true }
            );
        }
        else 
            Toast.show({
                type: 'error',
                text1: 'Данные не сохранены',
            });
    }

    const dropNote = () => {
        Alert.alert(
            'Удаление заметки',
            'Вы уверены, что хотите удалить заметку?',
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'ОК', style: "destructive", onPress: () => {
                    console.log('OK Pressed');
                    deleteNote(ID_note);
                    navigation.goBack();
                }},
            ],
            { cancelable: true }
        );
    }

    return(
        <View style = {[styles.view]}>
            <View>
                <Text style = {[styles.info, {fontWeight: '600'}]}>{ title }</Text>
                <Text style = {[styles.info]}>Ученик: { kid }</Text>
            </View>
            <View style = {[styles.action]}>
                <View style={[styles.element]}>
                    <Text style = {[styles.info]}>Тема</Text>
                    <TextInput
                        style={styles.input}
                        value={newTitleData}
                        onChangeText={(value) => setTitleData(value)}
                        placeholder="Введите тему"
                        placeholderTextColor='#000000'
                    />
                </View>
                <View style={[styles.element]}>
                    <Text style = {[styles.info]}>Описание</Text>
                    <TextInput
                        style={[styles.input, {height: 100}]}
                        multiline={true}
                        numberOfLines={4}
                        value={newDiscription}
                        onChangeText={(value) => setDiscription(value)}
                        placeholder="Введите описание"
                        placeholderTextColor='#000000'
                    />
                </View>
            </View>
            {!keyboardVisible && (
                <View style = {[styles.transition]}>
                    <TouchableOpacity style = {{margin: 10}} onPress={UpdateDate}><Text style = {[styles.end]}>Изменить заметку по курсу</Text></TouchableOpacity>
                    <TouchableOpacity style = {{margin: 10, marginBottom: 20}} onPress={dropNote}><Text style = {[styles.end, {color: "#FF3C14"}]}>Удалить заметку по курсу</Text></TouchableOpacity>
                </View>
            )}   
        </View>
    )
}

export default Edit