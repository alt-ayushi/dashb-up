
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react'; 
import { Provider } from 'react-redux';             
import store from './store/store';                 
import './index.css';
import App from './App.jsx';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please add it to your .env file.");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </StrictMode>
);