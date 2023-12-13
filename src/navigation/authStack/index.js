import {COLORS} from '../../constants/theme';
import OtpScreen from '../../screens/optScreen';
import LoginScreen from '../../screens/loginScreen';
import {SCREEN_NAMES} from '../../constants/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.white,
        headerStyle: {backgroundColor: COLORS.green_400},
        cardStyle: {backgroundColor: COLORS.primary_black},
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={SCREEN_NAMES.LOGIN_SCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREEN_NAMES.OTP_SCREEN}
        component={OtpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
