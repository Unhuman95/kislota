import  React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
import { addNote } from '../DB/appel';

const AddData = ({ route, navigation }) => {
    const { ID_course, kid, title } = route.params;

    const [titleData, settitleData] = useState(null);
    const [discription, setdiscription] = useState(null);

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const InsertNote = () => {
        if (titleData != null && discription != null) {
            addNote(ID_course, titleData, discription);
            navigation.goBack();
        }
        else 
            Toast.show({
                type: 'error',
                text1: 'Заполните необходимые поля! ',
            });
    };

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
                        value={titleData}
                        onChangeText={(value) => settitleData(value)}
                        placeholder="Введите тему"
                        placeholderTextColor='#917F99'
                    />
                </View>
                <View style={[styles.element]}>
                    <Text style = {[styles.info]}>Описание</Text>
                    <TextInput
                        style={[styles.input, {height: 100}]}
                        multiline={true}
                        numberOfLines={4}
                        value={discription}
                        onChangeText={(value) => setdiscription(value)}
                        placeholder="Введите описание"
                        placeholderTextColor='#917F99'
                    />
                </View>
            </View>
            {!keyboardVisible && (
                <View style = {[styles.transition]}>
                    <TouchableOpacity style = {{padding: 10}} onPress={InsertNote}><Text style = {[styles.end]}>Добавить заметку по курсу</Text></TouchableOpacity>
                </View>
            )}            
        </View>
    )
}

export default AddData