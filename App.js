import * as React from 'react';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';
import { store, persistor } from './store';

export default function App() {
  return (
      <Provider store={store}>
          <PersistGate
              loading={<Loading />}
              persistor={persistor}
          >
              <Main />
          </PersistGate>
      </Provider>
  );
}
