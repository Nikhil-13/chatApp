import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearPendingMessages} from '../../store/redux/userSlice';

import TopTabs from '../topTabs';
import ChatScreen from '../../screens/chatScreen';
import NewChat from '../../screens/newChatScreen';
import IconButton from '../../components/ui/iconButton';
import {SCREEN_NAMES} from '../../constants/navigation';
import AuthContext from '../../store/context/authContext';
import database from '@react-native-firebase/database';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForwardMessageScreen from '../../screens/forwardMessageScreen';
import {COLORS} from '../../constants/theme';
import {useNetInfo} from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const {token, logout} = useContext(AuthContext);
  const users = useSelector(state => state.user.users);
  const userName = users.filter(user => user.number === token)[0]?.name;
  const pendingMessages = useSelector(state => state.user.pendingMessages);
  const {isConnected} = useNetInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!pendingMessages) {
      if (isConnected) {
        pendingMessages.forEach(async message => {
          const {recepientNumber} = message[1];
          const messageObj = {
            ...message[1],
            status: 'sent',
          };
          const pushUserData = await database()
            .ref('/users/' + token + '/chats' + '/' + recepientNumber)
            .push({...messageObj});
          const pushRecepientData = await database()
            .ref('/users/' + recepientNumber + '/chats' + '/' + token)
            .push({...messageObj});
        });
      }
    }
    dispatch(clearPendingMessages());
  }, [isConnected]);

  function LeftHeader({color}) {
    return (
      <Text style={[styles.leftHeaderTitle, {color: color}]}>{userName}</Text>
    );
  }

  function RightHeader({color}) {
    return (
      <View style={styles.rightHeader}>
        <IconButton name={'magnify'} color={color} size={24} />
        <IconButton name={'camera'} color={color} size={24} />
        <IconButton
          name={'logout'}
          color={color}
          onPress={logout}
          size={24}
          flat={true}
        />
      </View>
    );
  }
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.green_400}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.green_400,
            marginLeft: 50,
            elevation: 0,
            shadowOpacity: 0,
          },
          gestureEnabled: true,
          headerTitle: '',
        }}>
        <Stack.Screen
          name="tabs"
          component={TopTabs}
          options={{
            headerRight: ({tintColor}) => <RightHeader color={tintColor} />,
            headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
          }}
        />
        <Stack.Screen name={SCREEN_NAMES.CHAT_SCREEN} component={ChatScreen} />
        <Stack.Screen name={SCREEN_NAMES.NEW_CHAT_SCREEN} component={NewChat} />
        <Stack.Screen
          name={SCREEN_NAMES.FORWARD_MESSAGE_SCREEN}
          component={ForwardMessageScreen}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  leftHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  rightHeader: {flexDirection: 'row', gap: 10},
});

export default AuthenticatedStack;
