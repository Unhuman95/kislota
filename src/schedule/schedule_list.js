import React, { useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

import { AuthContext } from '../context';
import Discipline from './discipline';
import { selectLesson } from '../DB/appel';

const Schedule = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [lessons, setLessons] = useState([]);

    const fetchTasks = async () => {
        try {
            const result = await selectLesson(user.ID_user, user.role);
            setLessons(result);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const renderItem = ({ item }) => {
        const { title, count, teacher, kid, lesson } = item;
        return (
            <Discipline
                title={title}
                count={count}
                teacher={teacher}
                kid={kid}
                lesson={lesson}
                navigation={navigation}
            />
        );
    };

    return (
        <View style={styles.view}>
            {lessons.length > 0 ? (
                <FlashList
                    data={lessons}
                    renderItem={renderItem}
                    estimatedItemSize={160} // Средняя высота одного элемента Discipline
                />
            ) : (
                <Text>No tasks available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        minHeight: 1,
    },
});

export default Schedule;
