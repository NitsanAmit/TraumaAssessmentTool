import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './components/styles/spacings.css';
import './components/styles/layout.css';
import { App } from './components/App';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

root.render(
  <FluentProvider theme={teamsLightTheme} dir="rtl">
    <RouterProvider router={router} />
  </FluentProvider>,
);
