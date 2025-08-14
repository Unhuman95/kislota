import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScheduleList from '../schedule/schedule_list';
import EditSchedule from '../schedule/edit_schedule';
import Reschedule from '../schedule/reschedule';

import CreateSchedule from '../profile/create_schedule';
import ExtraFunction from '../profile/extra_function';
import ProfileSettings from '../profile/profile_settings';
import AddIntoCourse from '../profile/add_course';
import StudentList from '../profile/students_list';
import Student from '../profile/student';

import Data from '../extra_data/data_list';
import Note from '../extra_data/note';
import EditData from '../extra_data/edit_data';
import AddData from '../extra_data/create_data';

import Contacts from '../chat/contacts';
import ChatScreen from '../chat/dialogue';

import Login from '../login/login';
import TabNavigation from './tab';
import Registration from '../login/registration';
import RegistrationTutor from '../login/registration_tutor';
import CreatePassword from '../login/password';


const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#000000',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFFFFF'
  },
  headerTitleAlign: 'center',
  headerTintColor: '#FFFFFF',
};

const LoginStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name = "login" 
                component = {Login}
                options={{title: "Вход"}}/>
            <Stack.Screen 
                name= "tab_navigation" 
                component={TabNavigation}
                options={{title: "Система"}}/>
            <Stack.Screen 
                name= "registration" 
                component={Registration}
                options={{title: "Регистрация"}}/>
            <Stack.Screen 
                name= "password" 
                component={CreatePassword}
                options={{title: "Создайте пароль"}}/>    
    </Stack.Navigator>
    )
}

const ScheduleStackNavigator = () => {
    return(
    <Stack.Navigator screenOptions= {screenOptions}>
        <Stack.Screen 
            name= "schedule" 
            component={ScheduleList}
            options={{title: "Расписание"}}/>
        <Stack.Screen 
            name= "edit_schedule" 
            component={EditSchedule}
            options={{title: "Редактирование"}}/>
        <Stack.Screen 
            name= "reschedule" 
            component={Reschedule}
            options={{title: "Перенос занятия"}}/>
    </Stack.Navigator>
    )};

const DataStackNavigator = () => {
        return(
        <Stack.Navigator screenOptions= {screenOptions}>
            <Stack.Screen 
                name = "link_list" 
                component = {Data}
                options = {{title: "Дополнительная информация"}}/>
            <Stack.Screen 
                name= "note_list" 
                component={Note}
                options={{title: "Заметки по курсу"}}/>
            <Stack.Screen 
                name= "edit_data" 
                component={EditData}
                options={{title: "Редактирование заметки"}}/>
            <Stack.Screen 
                name= "add_data" 
                component={AddData}
                options={{title: "Добавить заметку"}}/>
        </Stack.Navigator>
    )
};

const ChatStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions= {screenOptions}>
            <Stack.Screen 
                name = "contacts" 
                component = {Contacts}
                options={{title: "Список контактов"}}/>
            <Stack.Screen 
                name= "chat_screen" 
                component={ChatScreen}
                options={{title: "Пользователь"}}/>
    </Stack.Navigator>
    )
};
const ExtraStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions= {screenOptions}>
            <Stack.Screen 
                name= "extra_function" 
                component={ExtraFunction}
                options={{title: "Меню"}}/>
            <Stack.Screen 
                name= "create_schedule" 
                component={CreateSchedule}
                options={{title: "Добавть урок в расписание"}}/>
            <Stack.Screen 
                name= "profile_settings_stack" 
                component={ProfileSettingsStack}
                options={{title: "Настройки профиля", headerShown: false}}/>
            <Stack.Screen 
                name= "add_course" 
                component={AddIntoCourse}
                options={{title: "Добавить курс"}}/>
            <Stack.Screen 
                name= "student_list_stack" 
                component={StudentListStack}
                options={{title: "Список студентов", headerShown: false}}/>
            <Stack.Screen 
                name= "tutor_stack" 
                component={TutorStack}
                options={{title: "Регистрация", headerShown: false}}/>

        </Stack.Navigator>
)};

const TutorStack = () => {
    return(
        <Stack.Navigator screenOptions= {screenOptions}>
            <Stack.Screen 
                name= "add_tutor" 
                component={RegistrationTutor}
                options={{title: "Регистрация"}}/>
            <Stack.Screen 
                name= "password" 
                component={CreatePassword}
                options={{title: "Создайте пароль"}}/>    
        </Stack.Navigator>
    )
}

const StudentListStack = () => {
    return(
        <Stack.Navigator screenOptions= {screenOptions}>
            <Stack.Screen 
                name= "student_list" 
                component={StudentList}
                options={{title: "Список студентов"}}/>
            <Stack.Screen 
                name= "student" 
                component={Student}
                options={{title: "Просмотр информации об ученике"}}/>
        </Stack.Navigator>
)};

const ProfileSettingsStack = () => {
    return(
        <Stack.Navigator screenOptions= {screenOptions}>
            <Stack.Screen 
                name= "profile_settings" 
                component={ProfileSettings}
                options={{title: "Настройки профиля"}}/>
            <Stack.Screen 
                name= "student" 
                component={Student}
                options={{title: "Просмотр информации об ученике"}}/>
        </Stack.Navigator>
)}

export {ScheduleStackNavigator, ExtraStackNavigator,
        LoginStackNavigator, DataStackNavigator, ChatStackNavigator};