import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from '@navigations/RootNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
