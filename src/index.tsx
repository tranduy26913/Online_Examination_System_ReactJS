import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store, persistor } from './app/store';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import ThemeConfig from 'theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </PersistGate>
  </Provider>

);
