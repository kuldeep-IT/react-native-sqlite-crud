import React, { useContext, useEffect, useState } from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import Toast from 'react-native-toast-message';
import { createTable } from './src/database/crud';
import { AuthContext, AuthProvider } from './src/lib/AuthContext';
import { auth } from './src/firebase/config';


const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    createTable();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthState />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AuthState = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: 'default' }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;