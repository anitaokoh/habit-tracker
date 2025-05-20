import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { registerServiceWorker } from './utils/serviceWorkerUtils';

// Register service worker
registerServiceWorker()
  .then((registration) => {
    console.log('Service worker registered:', registration);
  })
  .catch((error) => {
    console.error('Service worker registration failed:', error);
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
