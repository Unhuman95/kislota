import  React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

import { updateNote, deleteNote } from '../DB/appel';

const Edit = ({ route, navigation }) => {
    const { ID_data, title_data, discription, kid, title } = route.params;

    const [newTitleData, setTitleData] = useState(title_data);
    const [newDiscription, setDiscription] = useState(discription);

    const UpdateDate = () => {
        updateNote(ID_data, newTitleData, newDiscription);
    }

    const dropNote = () => {
        deleteNote(ID_data);
        navigation.goBack();
    }

    return(
        <View style = {[styles.list]}>
            <View>
                <Text style = {[styles.text]}>{ title }</Text>
                <Text style = {[styles.text]}>Ученик: { kid }</Text>
            </View>
            <View style = {[styles.element]}>
            <Text style = {[styles.text]}>Тема</Text>
                <TextInput
                    style={styles.input}
                    value={newTitleData}
                    onChangeText={(value) => setTitleData(value)}
                />

            <Text style = {[styles.text]}>Описание</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    value={newDiscription}
                    onChangeText={(value) => setDiscription(value)}
                />
            </View>
            <View style={{flex: 1}} />
            <View>
                <TouchableOpacity style = {{margin: 10}} onPress={UpdateDate}><Text style = {[styles.end, {color: "#008800"}]}>Изменить заметку по курсу</Text></TouchableOpacity>
                <TouchableOpacity style = {{margin: 10, marginBottom: 20}} onPress={dropNote}><Text style = {[styles.end, {color: "#880000"}]}>Удалить заметку по курсу</Text></TouchableOpacity>
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        margin: 8,
        textAlign: 'center'
    },
    listDateTime: {
        alignItems: 'center',
    },
    textDateTime: {
        fontSize: 18,
        color: "#b00000"
    },
    element: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        justifyContent: 'space-around'
    },
    list: {
        flex: 1,
        alignItems: 'center',

    },
    input: {
        color: "#000000",
    },
    end: {
        textAlign: "center",
        fontSize: 20,
      }
});

export default Edit