import RootLayout from './components/RootLayout';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './pages/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootLayout>
    <HashRouter>
      <App />
    </HashRouter>
    </RootLayout>
  </React.StrictMode>
);