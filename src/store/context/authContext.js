import {createContext} from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeUsers} from '../redux/userSlice';

const AuthContext = createContext({
  token: '',
  userName: '',
  isAuthenticated: false,
  authenticate: () => {},
});

export const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    async function getTokenFromStorage() {
      const token = await AsyncStorage.getItem('token');
      setAuthToken(token);
      const userName = await AsyncStorage.getItem('userName');
      // if (token) {
      setUserName(userName);
      // }
    }
    getTokenFromStorage();
  }, []);

  function authenticate(token, name) {
    setAuthToken(token);
    setUserName(name);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('userName', name);
  }
  function logout() {
    setUserName(null);
    setAuthToken(null);
    AsyncStorage.setItem('token', '');
    AsyncStorage.setItem('userName', '');
    AsyncStorage.setItem('number', '');
    AsyncStorage.setItem('name', '');
  }

  const value = {
    token: authToken,
    userName: userName,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
