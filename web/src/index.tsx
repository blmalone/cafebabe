// // src/index.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { HashRouter } from 'react-router-dom';
// import App from './pages/App';
import RootLayout from './components/RootLayout';

// const root = ReactDOM.createRoot(document.getElementById('root')!);

// root.render(
//   <RootLayout>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </RootLayout>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './pages/App';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <RootLayout>
//     <HashRouter>
//       <App />
//     </HashRouter>
//     </RootLayout>
//   </React.StrictMode>
// );



import {
  createHashRouter
} from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/*",
    element: <App />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <RootLayout>
    <HashRouter>
      <App />
    </HashRouter>
    </RootLayout>
  </React.StrictMode>
);