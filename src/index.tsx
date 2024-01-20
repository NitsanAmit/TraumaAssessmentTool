import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './components/styles/spacings.css';
import './components/styles/layout.css';
import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FluentProvider } from '@fluentui/react-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><App /></ErrorBoundary>,
  },
]);

root.render(
  <FluentProvider theme={AppTheme} dir="rtl">
    <RouterProvider router={router} />
  </FluentProvider>,
);
