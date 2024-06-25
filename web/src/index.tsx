// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';
import RootLayout from './components/RootLayout';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <RootLayout>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootLayout>
);
