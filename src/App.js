import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createTables, testData, deleteDB, db, selectAll } from './DB/data_base';
import { LoginStackNavigator } from './navigation/stack';
import { RoleProvider } from './context';
import TabNavigation from './navigation/tab';

const App = () => {
  useEffect(() => {
    //deleteDB();
    createTables(); 
    //testData();
    selectAll()
  }, []);

  return (
    <RoleProvider>
      <NavigationContainer>
        <LoginStackNavigator/>
      </NavigationContainer>
    </RoleProvider>
  );
};

export default App;