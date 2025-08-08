import  React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

import styles from '../../design/style';
import { AuthContext } from '../context';
import { addCourse, selectClass, selectTraining } from '../DB/appel';

const AddIntoCourse = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [discipline, setDiscipline] = useState(null);
  const [purpose, setPurpose] = useState(null);

  const [disciplines, setDisciplines] = useState([]);
  const [purposes, setPurposes] = useState([]);

  const IntoCourse = () => {
    if (discipline != null && purpose != null){
      addCourse(user.ID_user, discipline, purpose);
      navigation.goBack();
    }
    else {
      Toast.show({
          type: 'error',
          text1: 'Выберете предмет и направление подготовки',
      });
    }
  }

  useEffect(() => {
    const search = async() =>{
        const disciplinesList = await selectClass();
        const disciplinesItem = disciplinesList.map((item) => ({
            label: item.title_class,
            value: item.ID_class,
          }));
        setDisciplines(disciplinesItem);
        
        const purposesList = await selectTraining();
        const purposesItem = purposesList.map((item) => ({
            label: item.title_training,
            value: item.ID_training
          }));
        setPurposes(purposesItem);
    };
    
    search()
  }, []);

  return(
    <View style = {[styles.view]}>
      <View style = {[styles.action]}>
        <View style = {[styles.element]}>
            <Text style = {styles.info}>Дисциплина:</Text>
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
                      fontSize: 20,
                    },
                  }}
                placeholder={{ label: "Выберете предмет", value: null }}
                onValueChange={(value) => setDiscipline(value)}
                items = {disciplines}
                value = {discipline}
                />
        </View>
        <View style = {[styles.element]}>
            <Text style = {styles.info}>Направление подготовки:</Text>
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
                      fontSize: 20,
                    },
                  }}
                placeholder={{ label: "Цель обращения", value: null }}
                onValueChange={(value) => setPurpose(value)}
                items = {purposes}
                value={purpose}
                />
        </View>
      </View>
      <View style = {[styles.transition]}>
        <TouchableOpacity onPress={IntoCourse} style = {styles.end}><Text style = {styles.end}>Попробовать пробный урок</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export default AddIntoCourse