import React, {useEffect} from 'react';
import RootNavigation from './src/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationContextProvider} from './src/Context/ApplicationContext';
import {SessionContextProvider} from './src/Context/SessionContext';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 300);
  }, []);
  return (
    <ApplicationContextProvider>
      <SessionContextProvider>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </SessionContextProvider>
    </ApplicationContextProvider>
  );
};

export default App;
