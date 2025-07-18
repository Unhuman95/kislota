import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScheduleList from '../schedule/schedule_list';
import EditSchedule from '../schedule/edit_schedule';
import Reschedule from '../schedule/reschedule';

//import TaskList from '../diary/diary';
//import EditTask from '../diary/edit_task';
//import AddTask from '../diary/add_task';

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


const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
    )
}

const ScheduleStackNavigator = () => {
    return(
    <Stack.Navigator>
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
        <Stack.Navigator>
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
        <Stack.Navigator>
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
            <Stack.Navigator>
                <Stack.Screen 
                    name= "extra_function" 
                    component={ExtraFunction}
                    options={{title: "Меню"}}/>
                <Stack.Screen 
                    name= "create_schedule" 
                    component={CreateSchedule}
                    options={{title: "Добавть урок в расписание"}}/>
                <Stack.Screen 
                    name= "profile_settings" 
                    component={ProfileSettings}
                    options={{title: "Настройки профиля"}}/>
                <Stack.Screen 
                    name= "add_course" 
                    component={AddIntoCourse}
                    options={{title: "Добавить курс"}}/>
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

/*const DiaryStackNavigator = () => {
    return(
    <Stack.Navigator>
        <Stack.Screen 
            name= "diary" 
            component={TaskList}
            options={{title: "Дневник"}}/>
        <Stack.Screen 
            name= "edit_task" 
            component={EditTask}
            options={{title: "Редактирование"}}/>
        <Stack.Screen 
            name= "add_task" 
            component={AddTask}
            options={{title: "Добавить задание"}}/>
    </Stack.Navigator>
)};*/

export {ScheduleStackNavigator, ExtraStackNavigator,
        LoginStackNavigator, DataStackNavigator, ChatStackNavigator};