import {createContext} from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
});

export const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    async function getTokenFromStorage() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }
      console.log('from async storage', token);
    }
    getTokenFromStorage();
  }, []);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }
  function logout() {
    AsyncStorage.setItem('token', '');
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
