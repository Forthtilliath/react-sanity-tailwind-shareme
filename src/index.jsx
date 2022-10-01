import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { SearchProvider } from './utils/contexts/SearchContext';
import { UserProvider } from './utils/contexts/UserContext';

import App from './App';
import './index.css';

function AppWithProviders({ children }) {
  return (
    <SearchProvider>
      <UserProvider>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
          {children}
        </GoogleOAuthProvider>
      </UserProvider>
    </SearchProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppWithProviders>
      <App />
    </AppWithProviders>
  </BrowserRouter>
);
