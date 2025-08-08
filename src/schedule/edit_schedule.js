import  React, { useState, useContext } from 'react';
import {View, Text, TouchableOpacity, Alert, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import styles from '../../design/style';
import { AuthContext } from '../context';
import { updateLesson, deleteLesson, UpdateReschedule } from '../DB/appel';

const Edit = ({ route, navigation }) => {
    const { user } = useContext(AuthContext);
    const { ID_lesson, day, time, title, teacher, kid, date_postponed_lesson, postponed } = route.params;

    const [newDay, setNewDay] = useState(day);
    const [date, setDate] = useState(new Date(date_postponed_lesson));
    const [oldTime, setOldTime] = useState(time);
    const [newTime, setNewTime] = useState(time ? new Date(time) : new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [mode, setMode] = useState('time');

    const days = [
        {label: "Воскресенье", value: 0}, 
        {label: "Понедельник", value: 1}, 
        {label: "Вторник", value: 2}, 
        {label: "Среда", value: 3}, 
        {label: "Четверг", value: 4}, 
        {label: "Пятница", value: 5}, 
        {label: "Суббота", value: 6}
    ];

    const changeLesson = () => {
         Alert.alert(
            'Обновление занятия',
            'Вы уверены, что хотите обновить занятие?',
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'ОК', style: "destructive", onPress: () => {
                    console.log('OK Pressed');
                    if(user.role == 'methodologist') updateLesson(ID_lesson, newDay, oldTime);
                    else UpdateReschedule(ID_lesson, oldTime, date);
                }},
            ],
            { cancelable: true }
        );
    }

    const showMode = (mode) => {
        if (mode === 'date') {
            setShowDatePicker(true);
        } else if (mode === 'time') {
            setShowTimePicker(true);
        }
        setMode(mode);
    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate) setDate(selectedDate);
        setShowDatePicker(false);
    };

    const onTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setNewTime(selectedTime);
            const formattedTime = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}`;
            setOldTime(formattedTime);
        }

        setShowTimePicker(false);
    }; 

    const dropLesson = () => {
        Alert.alert(
            'Удаление занятия',
            'Вы уверены, что хотите удалить занятие из расписания?',
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'ОК', style: "destructive", onPress: () => {
                    console.log('OK Pressed');
                    deleteLesson(ID_lesson);
                    navigation.goBack();
                }},
            ],
            { cancelable: true }
        );
    }

    return(
        <View style = {[styles.view]}>
            <View>
                <Text style = {[styles.info]}>{ title }</Text>
                {user.role === 'methodologist' && (
                    <Text style = {[styles.info]}>Репетитор: { teacher }</Text>
                )}
                <Text style = {[styles.info]}>Ученик: { kid }</Text>
            </View>

            <View style = {[styles.action]}>
                {user.role === 'methodologist' && (
                    <View style={[styles.element]}>
                        <Text style={styles.info}>День недели:</Text>
                        <RNPickerSelect
                            style={{
                                inputIOS: {
                                    color: '#FFFFFF',  
                                    margin: 5,
                                    padding: 10,
                                    fontSize: 20,
                                },
                                inputAndroid: {
                                    color: '#FFFFFF',
                                    margin: 5,
                                    padding: 10,
                                    fontSize: 20,
                                },
                            }}
                            placeholder={{ label: "Выберете день", value: null }}
                            onValueChange={(value) => setNewDay(value)}
                            items = {days}
                            value = {newDay}
                        />
                    </View>
                )}
                {user.role === 'tutor' && (
                    <View style={[styles.element]}>
                        <Text style={styles.info}>Дата проведения:</Text>
                        <Button color={"#00A8BA"} onPress={() => showMode('date')} title="Выбрать дату" />
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                is24Hour={true}
                                onChange={onDateChange}
                            />
                        )}
                    </View>
                )}
                <View style={[styles.element]}>
                    <Text style={[styles.info]}>Время проведения:</Text>
                    <TouchableOpacity  onLongPress={() => showMode('time')}>
                        <Text style={[styles.info]}>{oldTime}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={newTime}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}
                </View>
            </View>
            <View style = {[styles.transition]}>
                <TouchableOpacity style = {{margin: 10}} onPress={changeLesson}>
                    <Text style = {styles.end}>Сохранить изменения</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {{margin: 10}} onPress={dropLesson}>
                    <Text style = {[styles.end, {color: '#FF3C14'}]}>Удалить урок из расписания</Text>
                </TouchableOpacity>
            </View>            
        </View>
    )
}

export default Edit