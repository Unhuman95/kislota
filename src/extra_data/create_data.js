import  React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

import { addNote } from '../DB/appel';

const AddData = ({ route, navigation }) => {
    const { ID_course, kid, title } = route.params;

    const [titleData, settitleData] = useState();
    const [discription, setdiscription] = useState();

    const InsertNote = () => {
        addNote(ID_course, titleData, discription);
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
                    value={titleData}
                    onChangeText={(value) => settitleData(value)}
                />

            <Text style = {[styles.text]}>Описание</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    value={discription}
                    onChangeText={(value) => setdiscription(value)}
                />
            </View>
            <View style={{flex: 1}} />
            <View>
                <TouchableOpacity style = {{margin: 10}} onPress={InsertNote}><Text style = {[styles.end, {color: "#008800"}]}>Добавить заметку по курсу</Text></TouchableOpacity>
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

export default AddData