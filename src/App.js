import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import LoadingScreen from '../design/loading';
import { LoginStackNavigator } from './navigation/stack';
import { AuthProvider, AuthContext  } from './context';
import TabNavigation from './navigation/tab';

const App = () => {
  return (
    <AuthProvider>
        <MainScreen/>
        <Toast
          position='bottom'
          bottomOffset={20}
          visibilityTime={3000}
        />
    </AuthProvider>
    
  );
};

const MainScreen = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading && user == null) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {user ? <TabNavigation/> : <LoginStackNavigator/>}     
    </NavigationContainer>
  );
}

export default App;