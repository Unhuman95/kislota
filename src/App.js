import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { LoginStackNavigator } from './navigation/stack';
import { AuthProvider, AuthContext  } from './context';
import TabNavigation from './navigation/tab';

const App = () => {
  return (
    <AuthProvider>
      <MainScreen/>
    </AuthProvider>
  );
};

const MainScreen = () => {
  const { user, loading } = useContext(AuthContext);

  //if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {user ? <TabNavigation/> : <LoginStackNavigator/>}     
    </NavigationContainer>
  );
}

export default App;