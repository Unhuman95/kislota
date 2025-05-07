import  React, { useState } from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { rescheduleLesson } from '../DB/appel';

const Reschedule = ({ route, navigation }) => {
    const { ID_lesson, time, title, kid } = route.params;

    const [date, setDate] = useState(new Date());
    const [oldTime, setOldTime] = useState(time);
    const [newTime, setNewTime] = useState(time ? new Date(time) : new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [mode, setMode] = useState('time');

    const showMode = (mode) => {
        if (mode === 'date') {
            setShowDatePicker(true);
        } else if (mode === 'time') {
            setShowTimePicker(true);
        }
        setMode(mode);
    };

    const onTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setNewTime(selectedTime);
            const formattedTime = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}`;
            setOldTime(formattedTime);
        }

        setShowTimePicker(false);
    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate) setDate(selectedDate);
        setShowDatePicker(false);
    };

    const addLesson = (newTime, ID_lesson, date) => {
        rescheduleLesson(ID_lesson, newTime, date);
        navigation.goBack();
    };

    return (
        <View style={[styles.list]}>
            <View>
                <Text style={[styles.text]}>{title}</Text>
                <Text style={[styles.text]}>Ученик: {kid}</Text>
            </View>

            <View style={[styles.element]}>
                <View style={{ height: 50 }}>
                    <Text style={styles.title}>Дата проведения:</Text>
                    <Button color={"#808080"} onPress={() => showMode('date')} title="Выбрать дату" />
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        is24Hour={true}
                        onChange={onDateChange}
                    />
                )}

                <View>
                    <TouchableOpacity onLongPress={() => showMode('time')} style={[styles.datetime]}>
                        <Text style={[styles.textDateTime]}>{oldTime}</Text>
                    </TouchableOpacity>
                </View>
                {showTimePicker && (
                    <DateTimePicker
                        value={newTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onTimeChange}
                    />
                )}
            </View>

            <View style={{ flex: 1 }} />
            <View>
                <TouchableOpacity style={{ margin: 20 }} onPress={() => addLesson(newTime, ID_lesson, date)}>
                    <Text style={styles.end}>Перенести занятие</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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

export default Reschedule