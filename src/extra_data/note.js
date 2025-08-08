import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import {Text, View, FlatList, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../../design/style';
import { AuthContext } from '../context';
import { selectData, addLink } from '../DB/appel';

export default function Note({route, navigation}) {
    const { user } = useContext(AuthContext);
    const { ID_course, kid, teacher, title, link } = route.params;

    const [notes, setNotes] = useState();
    const [newLink, setNewLink] = useState(link);

    const [refreshing, setRefreshing] = useState(false);
    //const [loading, setLoading] = useState(true);

    //const CACHE_TTL = 10 * 60 * 1000; // 10 минут в миллисекундах
    const cacheKey = `notes__${ID_course}`;

    useLayoutEffect(() => {
          navigation.setOptions({
            title: title,
          });
      }, [navigation, title]);

    useEffect(() => {
      let isMounted = true;
      const loadFromCache = async () => {
        try {
          const cached = await AsyncStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed?.notes && isMounted) {
              setNotes(parsed.notes);
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
      }, [ID_course]);

    const fetchTasks = async () => {
      try {
        const freshData = await selectData(ID_course);
        setNotes(freshData);
        await AsyncStorage.setItem(
          cacheKey,
          JSON.stringify({ notes: freshData, timestamp: Date.now() })
        );
      } catch (error) {
        console.error('Ошибка при загрузке данных с сервера:', error);
      } finally {
        //setLoading(false);
        setRefreshing(false);
      }
    };

    const onRefresh = async () => {
      setRefreshing(true);
      await fetchTasks();
    };

    const handlePress = () => {
      navigation.navigate('add_data', { kid, title, ID_course });
    }; 

    const handleLongPress = ({ID_note, title_note, discription}) => {
      if(user.role == 'tutor') navigation.navigate('edit_data', {ID_note, title_note, discription, kid, title});
    };

    return (
      <View style={styles.view}>
        <View>
          <Text style={styles.info}>Репетитор: {teacher}</Text>
          <Text style={styles.info}>Ученик: {kid}</Text>
          {user.role === 'student' && (
            <Text style={styles.info}>Ссылка: {newLink}</Text>
          )}
        </View>

        <View style={styles.place}>
          <FlatList
            keyExtractor={(item) => item.ID_note.toString()}
            data={notes}
            renderItem={({ item }) => (
              <Item
                ID_note={item.ID_note}
                discription={item.discription}
                title_note={item.title_note}
                handleLongPress={handleLongPress}
              />
            )}
            keyboardShouldPersistTaps="handled"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>

        {user.role === 'tutor' && (
          <View>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => handlePress()}>
              <Text style={styles.end}>Добавить заметку</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
              
              <View style={styles.link}>
                <Text style={[styles.info, { margin: 5 }]}>Ссылка:</Text>
                <View style={{flex:1}}>
                  <TextInput
                    style={styles.input}
                    value={newLink}
                    onChangeText={(value) => setNewLink(value)}
                    placeholder="Введите ссылку"
                    placeholderTextColor='#917F99'
                  />
                </View>
                <Button color='#DF2600' title=">>" onPress={() => addLink(ID_course, newLink)} />
              </View>

            </KeyboardAvoidingView>

          </View>
        )}
      </View>
    );
}

const Item = ({ ID_note, discription, title_note, handleLongPress }) => {
  return(
    <TouchableOpacity
        onLongPress={() => handleLongPress({ID_note, discription, title_note})}>
      <View style = {styles.container}>
          <Text style = {[styles.name, {fontWeight: 600}]}>{title_note}</Text>
          <Text style = {[styles.name]}>{discription}</Text>
      </View>
    </TouchableOpacity>
)};

/*const styles = StyleSheet.create({
  title: {
    flex: 0,
    margin: 5,
    alignItems: 'center'
  },
  schedule: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 3,
  },
  text: {
    fontSize: 18,
    padding: 5,
  },
  input: {
    color: "#000000",
    fontSize: 18,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    margin: 5,
    flexDirection: 'column'
  },
  element: {
    backgroundColor: '#808080',
    padding: 5,
    margin: 5,
    borderRadius: 5
  },
  end: {
    textAlign: "center",
    fontSize: 20,
    color: "#008800"
  },
})*/