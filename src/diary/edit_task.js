import  React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { updateTask, deleteTask } from '../DB/data_base';

const Edit = ({ route, navigation }) => {
    const { item } = route.params;
    const ID_task = item.ID_task;
    const ID_lesson = item.ID_lesson;
    const [description, setDescription] = useState(item.description);
    const [rating, setRating] = useState(item.rating);
    const [date, setDate] = useState(new Date(item.date));
    
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const editTask = () => {
        updateTask({ID_task, description, rating, date, ID_lesson});
        navigation.goBack();
    }

    const dropTask = () => {
        deleteTask({ID_task});
        navigation.goBack();
    }
  
    return(
        <View style = {[styles.list]}>
            <View>
                <Text style = {styles.title}>Дисциплина: {item.discipline}</Text>
            </View>
            <View>
                <Text style = {styles.title}>Ученик: {item.kid}</Text>
            </View>
                
            <View>
                <Text style = {styles.title}>Описание задания:</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={(value) => setDescription(value)}
                />
            </View>
            <View>
                <Text style = {styles.title}>Крайний срок:</Text> 
                <Button color = {"#808080"} onPress={() => showMode('date')} title="Выбрать дату"/>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                )}              
            </View>
            <View>
                <Text style = {styles.title}>Оценка:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setRating(value)}
                    value={rating}
                    keyboardType='numeric'
                />
            </View>
            <View style={{flex: 1}} />
            <View>
              <TouchableOpacity style = {{margin: 10}} onPress={editTask}><Text style = {styles.end}>Изменить</Text></TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style = {{margin: 10}} onPress={dropTask}><Text style = {styles.end}>Удалить</Text></TouchableOpacity>
            </View>
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

export default Edit