import { useEffect, useContext } from 'react';
import { StatusBar, Button } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecentChats from './src/screens/recentChatsScreen';
import LoginScreen from './src/screens/loginScreen';
import OtpScreen from './src/screens/optScreen';
import ChatScreen from './src/screens/chatScreen';
import AuthContext, { AuthContextProvider } from './src/store/authContext';
import { COLORS } from './src/constants/theme';
import IconButton from './src/components/ui/iconButton';
import NewChat from './src/screens/newChatScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  function AuthStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.green_400 },
          cardStyle: { backgroundColor: COLORS.primary_black },
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function AuthenticatedStack() {
    const { logout } = useContext(AuthContext);

    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.green_400 },
          cardStyle: { backgroundColor: COLORS.primary_black },
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="RecentChats"
          component={RecentChats}
          options={{
            headerRight: ({ tintColor }) => <IconButton name={'logout'} color={tintColor} onPress={logout} size={24} flat={true} />,
          }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="NewChatScreen" component={NewChat} />
      </Stack.Navigator>
    );
  }

  function Navigation() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
      <NavigationContainer>
        {!isAuthenticated && <AuthStack />}
        {isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.green_400} />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
};
export default App;
