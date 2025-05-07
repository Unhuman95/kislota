import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScheduleStackNavigator, ChatStackNavigator, ExtraStackNavigator, DataStackNavigator } from './stack'

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
                name = "discipline_stack"
                component = {DataStackNavigator}
                options={{title: "Список предметов"}}
            />
            <Tab.Screen
                name = "chat_stack"
                component = {ChatStackNavigator}
                options={{title: "чат"}}
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