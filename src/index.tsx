import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
// tslint:disable-next-line
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ConfirmContextProvider } from 'utils/contexts/ConfirmContext';

import App from './App';
import './index.css';
import { queryClient } from './queryClient';
import { SearchProvider } from './utils/contexts/SearchContext';
import { UserProvider } from './utils/contexts/UserContext';

const AppWithProviders = ({ children }: PropsWithChildren) => {
  if (!process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN) {
    return (
      <p>
        <strong>REACT_APP_PUBLIC_GOOGLE_API_TOKEN</strong> Not Found!
      </p>
    );
  }

  return (
    <ConfirmContextProvider>
      <SearchProvider>
        <UserProvider>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN!}>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools
                initialIsOpen
                panelProps={{ style: { height: 250 } }}
              />
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </UserProvider>
      </SearchProvider>
    </ConfirmContextProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <AppWithProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppWithProviders>
);
