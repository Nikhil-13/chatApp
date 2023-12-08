import {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {StatusBar, Button, Linking, Platform} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RecentChats from './src/screens/recentChatsScreen';
import LoginScreen from './src/screens/loginScreen';
import OtpScreen from './src/screens/optScreen';
import ChatScreen from './src/screens/chatScreen';
import NewChat from './src/screens/newChatScreen';
import IconButton from './src/components/ui/iconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext, {
  AuthContextProvider,
} from './src/store/context/authContext';
import {COLORS} from './src/constants/theme';

const Stack = createNativeStackNavigator();

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const App = () => {
  const [isReady, setIsReady] = useState(false);

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

    return (
      <>
        <StatusBar
          backgroundColor={COLORS.green_400}
          barStyle={'light-content'}
        />
        <Stack.Navigator
          screenOptions={{
            headerTintColor: COLORS.white,
            headerStyle: {backgroundColor: COLORS.green_400, marginLeft: 50},
            gestureEnabled: true,
            headerTitle: '',
          }}>
          <Stack.Screen
            name="RecentChats"
            component={RecentChats}
            options={{
              headerRight: ({tintColor}) => (
                <IconButton
                  name={'logout'}
                  color={tintColor}
                  onPress={logout}
                  size={24}
                  flat={true}
                />
              ),
            }}
          />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="NewChatScreen" component={NewChat} />
        </Stack.Navigator>
      </>
    );
  }

  function Navigation() {
    const {isAuthenticated} = useContext(AuthContext);
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

  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};
export default App;
