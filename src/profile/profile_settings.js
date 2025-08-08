import  React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput, Keyboard, Button} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import styles from '../../design/style';
import { selectUser, changePassword, updateUser } from '../DB/appel';
import { AuthContext } from '../context';

const ProfileSettings = ({navigation}) => {
    const { user } = useContext(AuthContext);

    const [name, setName] = useState(null);
    const [mail, setMail] = useState(null);
    const [course, setCourse] = useState(null);
    const [phone, setPhone] = useState(null);

    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [passChange, setPassChange] = useState(false);
    const [label, setLabel] = useState('Изменить пароль')
        
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const fetchTasks = async () => {
        try {
            const dataList = await selectUser(user.ID_user);
            setName(dataList.full_name);
            setMail(dataList.Email);
            setCourse(dataList.class);
            setPhone(dataList.phone_number);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const openMenu = () => {
        setPassChange(prev => !prev);
        if (!passChange) setLabel('Отмена');
        else setLabel('Изменить пароль')
    };

    const update = () => {
        Alert.alert(
            'Изменение профиля',
            'Вы уверены, что хотите изменить профиль?',
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'ОК', style: "destructive", onPress: () => {
                    updateUser(user.ID_user, name, phone);
                }},
            ],
            { cancelable: true }
        );
    }
    
    return(
        <View style = {[styles.view]}>
            <View style = {{flex:1, margin:10}}>
                <View>
                    <Text style = {styles.name}>ФИО:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(value) => setName(value)}
                        placeholder="Введите ФИО"
                        placeholderTextColor='#917F99'
                    />
                </View>
                
                <View>
                    <Text style = {styles.name}>Номер телефона:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                        placeholder="Введите номер телефона"
                        placeholderTextColor='#917F99'
                    />
                </View>
                {passChange && (
                    <View style={[styles.place,{marginHorizontal: 20}]}>
                        <TextInput
                            placeholder="Старый пароль"
                            secureTextEntry
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            style={styles.input}
                            placeholderTextColor='#917F99'
                        />
                        <TextInput
                            placeholder="Новый пароль"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                            style={styles.input}
                            placeholderTextColor='#917F99'
                        />
                        <TextInput
                            placeholder="Подтвердите новый пароль"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={[styles.input, {marginBottom: 10}]}
                            placeholderTextColor='#917F99'
                        />
                        <Button color='#00A8BA' title="Сменить пароль" onPress={() => changePassword(oldPassword, newPassword, confirmPassword, user.ID_user)} />
                    </View>
                )}
                
                <TouchableOpacity onPress = {() => openMenu()}><Text style = {[styles.end, {color:'#FF3C14'}]}>{label}</Text></TouchableOpacity>
            </View>
            {!keyboardVisible && (
                <View style = {[styles.transition]}>
                    <TouchableOpacity onPress= {() => update()}style = {{margin: 10}}><Text style = {styles.end}>Изменить данные</Text></TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default ProfileSettings