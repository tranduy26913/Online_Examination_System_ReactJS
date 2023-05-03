import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store, persistor } from './app/store';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import ThemeConfig from 'theme';

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') 
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ThemeConfig>
           <App />
      </ThemeConfig>
    </QueryClientProvider>
      
    </PersistGate>
  </Provider>

);
