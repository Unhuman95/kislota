import  React, { useState } from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

//import { updateTime, updateDay, deleteLesson } from '../DB/data_base';

import { updateTime, updateDay, deleteLesson } from '../DB/appel';

const Edit = ({ route, navigation }) => {
    const { ID_lesson, day, time, title, teacher, kid } = route.params;

    const [date, setDate] = useState(day);
    const [oldTime, setOldTime] = useState(time);
    const [newTime, setNewTime] = useState(time ? new Date(time) : new Date());

    const [show, setShow] = useState(false);

    const days = [
        {label: "Воскресенье", value: 0}, 
        {label: "Понедельник", value: 1}, 
        {label: "Вторник", value: 2}, 
        {label: "Среда", value: 3}, 
        {label: "Четверг", value: 4}, 
        {label: "Пятница", value: 5}, 
        {label: "Суббота", value: 6}
    ];

    const UpdateDate = (newDate) => {
        setDate(newDate);
        updateDay(ID_lesson, newDate);
    }

    const showTimePicker = () => {
        setShow(true);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || newTime;
        setShow(false);
        setNewTime(currentDate);
        const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
        setOldTime(formattedTime);
        updateTime(ID_lesson, currentDate);
    }; 

    const dropLesson = () => {
        deleteLesson(ID_lesson);
        navigation.goBack();
    }

    return(
        <View style = {[styles.list]}>
            <View>
                <Text style = {[styles.text]}>{ title }</Text>
                <Text style = {[styles.text]}>Репетитор: { teacher }</Text>
                <Text style = {[styles.text]}>Ученик: { kid }</Text>
            </View>
            <View style = {[styles.element]}>
                <View style={{ height: 50 }}>
                    <RNPickerSelect
                        style={{
                            inputIOS: {
                                color: '#b00000',  
                                margin: 10,
                            },
                            inputAndroid: {
                                color: '#b00000',
                                margin: 10,
                            },
                        }}
                        placeholder={{ label: "Выберете день", value: null }}
                        onValueChange={(value) => UpdateDate(value)}
                        items = {days}
                        value = {date}
                    />
                </View>

                <TouchableOpacity  onLongPress={showTimePicker} style = {[styles.datetime]}>
                    <Text style = {[styles.textDateTime]}>{oldTime}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={newTime}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={{flex: 1}} />
            <View>
                <TouchableOpacity style = {{margin: 20}} onPress={dropLesson}><Text style = {styles.end}>Удалить урок их расписания</Text></TouchableOpacity>
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

    end: {
        textAlign: "center",
        fontSize: 20,
        color: "#008800",
      }
});

export default Edit