import * as React from 'react';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';
import store from './store';

export default function App() {
  return (
      <Provider store={store}>
        <Main />
      </Provider>
  );
}
