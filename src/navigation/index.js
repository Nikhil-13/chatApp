import 'react-native-gesture-handler';
import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../store/context/authContext';
import AuthStack from './authStack';
import AuthenticatedStack from './authenticatedStack';
import SplashScreen from '../components/ui/splashScreen';

const Navigation = () => {
  const {isAuthenticated, token} = useContext(AuthContext);

  if (token === undefined) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default Navigation;
