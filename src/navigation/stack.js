import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScheduleList from '../schedule/schedule';
import EditSchedule from '../schedule/edit_schedule';
import TaskList from '../diary/diary';
import EditTask from '../diary/edit_task'
import AddTask from '../diary/add_task'
import CreateSchedule from '../profile/create_schedule';
import ExtraFunction from '../profile/extra_function';
import ProfileSettings from '../profile/profile_settings';
import { Login } from '../login/login';
import TabNavigation from './tab';
import AddIntoCourse from '../profile/add_course'

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
    </Stack.Navigator>
    )};

    const DiaryStackNavigator = () => {
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
        )};

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
            </Stack.Navigator>
            )}

export {ScheduleStackNavigator, DiaryStackNavigator, ExtraStackNavigator, LoginStackNavigator};