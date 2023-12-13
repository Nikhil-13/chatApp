import 'react-native-gesture-handler';
import {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {ActivityIndicator, Linking, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../store/context/authContext';
import AuthStack from './authStack';
import AuthenticatedStack from './authenticatedStack';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const Navigation = () => {
  const {isAuthenticated, token} = useContext(AuthContext);

  if (token === undefined) {
    return null;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default Navigation;
