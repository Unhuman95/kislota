import  React, { useState, useContext, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../../design/style';
import { selectLink } from '../DB/appel';
import { AuthContext } from '../context';

const Data = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [disciplines, setDisciplines] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  //const CACHE_TTL = 10 * 60 * 1000; // 10 минут в миллисекундах
  const cacheKey = `disciplines_${user.ID_user}`;

  useEffect(() => {
    let isMounted = true;
    const loadFromCache = async () => {
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.disciplines && isMounted) {
            setDisciplines(parsed.disciplines);
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
      const freshData = await selectLink(user.ID_user, user.role);
      setDisciplines(freshData);
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({ disciplines: freshData, timestamp: Date.now() })
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

  const handlePress = (item) => {
    const { ID_course, kid, teacher, title, link } = item;
    navigation.navigate("note_list", { ID_course, kid, teacher, title, link });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.column}>
            <Text style={[styles.left_up, styles.text]}>{item.title}</Text>
            <Text style={[styles.right_up, styles.text]}>{item.purpose}</Text>
          </View>
          <View style={styles.column}>
            <Text style={[styles.left_bottom, styles.text]}>Репетитор: {item.teacher}</Text>
            <Text style={[styles.right_bottom, styles.text]}>Ученик: {item.kid}</Text>
          </View>
        </View>
        <View style={styles.schedule}>
          <Text style={[styles.list, styles.text]}>Ссылка: {item.link}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.view}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : disciplines.length > 0 ? (
        <FlashList
          data={disciplines}
          renderItem={renderItem}
          estimatedItemSize={160}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => item.ID_course?.toString() || index.toString()}
        />
      ) : (
        <Text>No tasks available</Text>
      )}
    </View>
  );
};

export default Data