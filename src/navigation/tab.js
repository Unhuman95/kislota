import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScheduleStackNavigator, ChatStackNavigator, ExtraStackNavigator, DataStackNavigator } from './stack'
import { AuthContext } from '../context';
import TabIcon from '../../design/icon';

import note from '../../assets/note.svg';
import schedule from '../../assets/schedule.svg';
import menu from '../../assets/menu.svg';
import chat from '../../assets/chat.svg'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const { user } = useContext(AuthContext);
    return (
        <Tab.Navigator 
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarActiveTintColor: '#888888',
                tabBarInactiveTintColor: '#FFFFFF',
                tabBarStyle: {
                    backgroundColor: '#000000',
                    //height: 50,
                },
                tabBarShowLabel: false,
            })}>
            <Tab.Screen
                name = "schedule_stack"
                component = {ScheduleStackNavigator}
                options={{
                    title: "Расписание",
                    tabBarIcon: ({ focused }) => (
                            <TabIcon Icon = {schedule} focused={focused}/>
                        )
                }}
            />
            {user.role !== 'methodologist' && (
                <Tab.Screen
                    name = "discipline_stack"
                    component = {DataStackNavigator}
                    options={{
                        title: "Список предметов",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon Icon = {note} focused={focused}/>
                        )
                    }}
            />)}
            <Tab.Screen
                name = "chat_stack"
                component = {ChatStackNavigator}
                options={{
                    title: "Чат",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon Icon = {chat} focused={focused}/>
                    )
                }}
            />
            <Tab.Screen
                name = "menu"
                component = {ExtraStackNavigator}
                options={{
                    title: "Меню",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon Icon = {menu} focused={focused}/>
                    )
                }}
            />
        </Tab.Navigator>
  );
};

export default TabNavigation;