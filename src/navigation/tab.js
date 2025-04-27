import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Contacts from '../chat/contacts';
import { ScheduleStackNavigator, DiaryStackNavigator, ExtraStackNavigator, DataStackNavigator } from './stack'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name = "schedule_stack"
                component = {ScheduleStackNavigator}
                options={{title: "Расписание"}}
            />
            <Tab.Screen
                name = "diary_stack"
                component = {DataStackNavigator}
                options={{title: "Дневник"}}
            />
            <Tab.Screen
                name = "menu"
                component = {ExtraStackNavigator}
                options={{title: "Меню"}}
            />
        </Tab.Navigator>
  );
};

export default TabNavigation;