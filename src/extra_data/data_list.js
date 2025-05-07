import  React, { useState, useContext, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { useFocusEffect } from "@react-navigation/native";

import { selectLink } from '../DB/appel';
import { AuthContext } from '../context';

const ViewTypes = {
    FULL: 0,
};

const Data = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const { width } = Dimensions.get("window");

    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => r1 !== r2)
    );

    const [layoutProvider, setLayoutProvider] = useState(null);

    const updateLayoutProvider = useCallback(() => {
      setLayoutProvider( new LayoutProvider(
          () => ViewTypes.FULL,
          (type, dim) => {
            switch (type) {
              case ViewTypes.FULL:
                dim.width = width;
                dim.height = 160;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
            }
          }
        ));
    }, [width]);

    const fetchTasks = async () => {
      try {
          const lessons = await selectLink(user.ID_user, user.role);
          setDataProvider(prev => prev.cloneWithRows(lessons));
          updateLayoutProvider();
      } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
      }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const handleLongPress = ({ ID_course, kid, teacher, title, link, navigation }) => {
      navigation.navigate('note_list', { ID_course, kid, teacher, title, link });
    };

    const rowRenderer = (type, data) => {
      const { title, purpose, teacher, kid, link, ID_course } = data;
      switch (type) {
          case ViewTypes.FULL:
              return (
                <TouchableOpacity style = {{flex: 1}}
                  onPress={() => handleLongPress({ID_course, kid, teacher, title, link, navigation})}>
                  <View style = {[styles.container]}>
                    <View style = {[styles.title]}>
                      <View style = {[styles.column]}>
                        <Text style = {[styles.discipline, styles.text]}>{title}</Text> 
                        <Text style = {[styles.count, styles.text]}>{purpose}</Text>
                      </View>
                      <View style = {[styles.column]}>
                        <Text style = {[styles.teacher, styles.text]}>Репетитор: {teacher}</Text>
                        <Text style = {[styles.kid, styles.text]}>Ученик: {kid}</Text>
                      </View>
                    </View>
                    <View style = {[styles.schedule]}>
                      <Text style = {[styles.lesson, styles.text]}>Ссылка: {link}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
          default:
              return null;
      }
    };
  
    return (
      <View style = {[styles.view]}>
            {dataProvider.getSize() > 0 ? (
                <RecyclerListView 
                    style={{flex: 1,}}
                    layoutProvider={layoutProvider} 
                    dataProvider={dataProvider} 
                    rowRenderer={rowRenderer}
                    windowSize={5}
                    scrollEnabled = {true}/>
            ):(
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
  title: {
    //flex: 0.5,
    height: 90,
  },
  lesson:{
    fontSize: 16,
    //margin: 5,
    //padding: 3
  },
  schedule: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 3,
  },
  text: {
      flex: 0.5,
      margin: 5,
      flexWrap: 'wrap',
      height: 50
  },
  discipline: {
    fontSize: 22,
    textAlign: 'left',
  },
  count: {
    fontSize: 20,
    textAlign: 'right',
  },
  teacher: {
    fontSize: 14,
    textAlign: 'left',
  },
  kid: {
    fontSize: 14,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    backgroundColor: "#808080",
    margin: 5,
    flexDirection: 'column',
    //minHeight: 1,
  },
  column: {
    flex: 1,
    backgroundColor: "#808080",
    flexDirection: 'row'
  }
});

export default Data