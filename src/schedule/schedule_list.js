import React, { useState, useCallback, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

import styles from '../../design/style';
import { AuthContext } from '../context';
import Discipline from './discipline';
import { selectLesson } from '../DB/appel';

const Schedule = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [lessons, setLessons] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const CACHE_TTL = 10 * 60 * 1000; // 10 минут в миллисекундах
    const cacheKey = `lessons_${user.ID_user}`;

    useEffect(() => {
        let isMounted = true;
        const loadFromCache = async () => {
        try {
            const cached = await AsyncStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed?.lessons && isMounted) {
                    setLessons(parsed.lessons);
                }
            }
        } catch (err) {
            console.warn('Не удалось загрузить кэш:', err);
        }
        };

        const init = async () => {
            await loadFromCache();
            await fetchTasks();
        };

        init();

        return () => {
        isMounted = false;
        };
    }, [user.ID_user, user.role]);

  const fetchTasks = async () => {
    try {
      const freshData = await selectLesson(user.ID_user, user.role);
      setLessons(freshData);
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({ lessons: freshData, timestamp: Date.now()})
      );
    } catch (error) {
      console.error('Ошибка при загрузке данных с сервера:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
  };

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
              {loading ? (
                <ActivityIndicator size="large" />
              ) : lessons.length > 0 ? (
                <FlashList
                  data={lessons}
                  renderItem={renderItem}
                  estimatedItemSize={160}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  keyExtractor={(item, index) => item.ID_lesson?.toString() || index.toString()}
                />
              ) : (
                <Text>No tasks available</Text>
              )}
            </View>
    );
};

export default Schedule;
