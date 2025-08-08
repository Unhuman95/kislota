import  React, { useState } from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
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
        if (date != null && newTime != null){
            rescheduleLesson(ID_lesson, newTime, date);
            navigation.goBack();
        }
        else 
            Toast.show({
                type: 'error',
                text1: 'Выбирете дату и время для переноса занятия',
            });
    };

    return (
        <View style={[styles.view]}>
            <View>
                <Text style={[styles.info]}>{title}</Text>
                <Text style={[styles.info]}>Ученик: {kid}</Text>
            </View>

            <View style={[styles.action]}>
                <View style={[styles.element]}>
                    <Text style={styles.info}>Дата проведения:</Text>
                    <Button color={"#00A8BA"} onPress={() => showMode('date')} title="Выбрать дату" />
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
                <View style={[styles.element]}> 
                    <Text style={[styles.info]}>Время проведения:</Text>
                    <TouchableOpacity onLongPress={() => showMode('time')}>
                        <Text style={[styles.info]}>{oldTime}</Text>
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
            <View style = {[styles.transition]}>
                <TouchableOpacity  onPress={() => addLesson(newTime, ID_lesson, date)}>
                    <Text style={styles.end}>Перенести занятие</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Reschedule