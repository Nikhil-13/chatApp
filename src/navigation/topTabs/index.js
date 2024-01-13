import React from 'react';

import CallScreen from '../../screens/callsScreen';
import UpdatesScreen from '../../screens/updatesScreen';
import RecentChats from '../../screens/recentChatsScreen';

import {COLORS} from '../../constants/theme';
import {TAB_SCREEN_NAMES} from '../../constants/navigation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.green_400,
          padding: 0,
          margin: 0,
          borderWidth: 0,
        },
        tabBarContentContainerStyle: {
          height: 40,
        },
        tabBarLabelStyle: {fontWeight: 'bold'},
        tabBarIndicatorStyle: {borderWidth: 1, borderColor: COLORS.green_100},
        tabBarActiveTintColor: COLORS.green_100,
        tabBarInactiveTintColor: COLORS.gray,
      }}>
      <Tab.Screen
        name={TAB_SCREEN_NAMES.RECENT_CHATS}
        component={RecentChats}
      />
      <Tab.Screen name={TAB_SCREEN_NAMES.UPDATES} component={UpdatesScreen} />
      <Tab.Screen name={TAB_SCREEN_NAMES.CALLS} component={CallScreen} />
    </Tab.Navigator>
  );
};

export default TopTabs;
