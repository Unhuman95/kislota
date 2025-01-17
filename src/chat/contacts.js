import React from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 1,
    image: "",
    name: "Иванов О.В.",
    last: "Перенос занятия"
  },
  {
    id: 2,
    image: "",
    name: "Горнин О.В.",
    last: "Ничего не изменилось"
  },
];

const Item = ({image, name, last}) => (
  <TouchableOpacity style={styles.item}>
    <Image
      source = {{uri: image}}
      style = {styles.avatar}
      resizeMode={'contain'}/>
    <View style = {styles.text}>
      <Text style = {styles.name}>{name}</Text>
      <Text style = {styles.massage}>{last}</Text>
    </View>
  </TouchableOpacity>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item name={item.name} last={item.last} image = {item.image}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    flexDirection: "column",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#888888',
    padding: 10,
    margin: 8,
    //marginHorizontal: 16,
  },
  name: {
    fontSize: 18,
  },
  massage: {
    fontSize: 16,
  },
  avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
});

export default App;