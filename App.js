import {useState, useContext, useEffect} from 'react';
import {
  StatusBar,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import OtpScreen from './src/screens/optScreen';
import ChatScreen from './src/screens/chatScreen';
import NewChat from './src/screens/newChatScreen';
import CallScreen from './src/screens/callsScreen';
import LoginScreen from './src/screens/loginScreen';
import IconButton from './src/components/ui/iconButton';
import UpdatesScreen from './src/screens/updatesScreen';
import RecentChats from './src/screens/recentChatsScreen';
import ForwardMessageScreen from './src/screens/forwardMessageScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext, {
  AuthContextProvider,
} from './src/store/context/authContext';
import {COLORS} from './src/constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const App = () => {
  function AuthStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: COLORS.white,
          headerStyle: {backgroundColor: COLORS.green_400},
          cardStyle: {backgroundColor: COLORS.primary_black},
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  function AuthenticatedStack() {
    const {logout} = useContext(AuthContext);

    function LeftHeader({color}) {
      return (
        <Text style={[styles.leftHeaderTitle, {color: color}]}>ChatsApp</Text>
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
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="NewChatScreen" component={NewChat} />
          <Stack.Screen
            name="ForwardMessageScreen"
            component={ForwardMessageScreen}
          />
        </Stack.Navigator>
      </>
    );
  }

  function Navigation() {
    const {isAuthenticated, logout} = useContext(AuthContext);
    const [isReady, setIsReady] = useState(false);
    const [initialState, setInitialState] = useState();

    useEffect(() => {
      const restoreState = async () => {
        try {
          const initialUrl = await Linking.getInitialURL();

          if (Platform.OS !== 'web' && initialUrl == null) {
            const savedStateString = await AsyncStorage.getItem(
              PERSISTENCE_KEY,
            );
            const state = savedStateString
              ? JSON.parse(savedStateString)
              : undefined;

            if (state !== undefined) {
              setInitialState(state);
            }
          }
        } finally {
          setIsReady(true);
        }
      };

      if (!isReady) {
        restoreState();
      }
    }, [isReady]);

    if (!isReady) {
      return null;
    }

    return (
      <NavigationContainer
        initialState={initialState}
        onStateChange={state =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }>
        {!isAuthenticated && <AuthStack />}
        {isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    );
  }

  function TopTabs() {
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
            borderWidth: 0,
            height: 40,
          },
          tabBarLabelStyle: {fontWeight: 'bold'},
          tabBarIndicatorStyle: {borderWidth: 1, borderColor: COLORS.green_100},
          tabBarActiveTintColor: COLORS.green_100,
          tabBarInactiveTintColor: COLORS.gray,
        }}>
        <Tab.Screen name="Chats" component={RecentChats} />
        <Tab.Screen name="Updates" component={UpdatesScreen} />
        <Tab.Screen name="Calls" component={CallScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  leftHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  rightHeader: {flexDirection: 'row', gap: 10},
});
export default App;
