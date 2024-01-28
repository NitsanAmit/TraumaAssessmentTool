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
import { QuestionnairesConfig } from './components/questionnaires/QuestionnairesConfig';
import { Home } from './components/Home';
import { FirebaseProvider } from './networking/firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><App /></ErrorBoundary>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/config',
        element: <QuestionnairesConfig />,
      },
    ],
  },
]);

root.render(
  <FluentProvider theme={AppTheme} dir="rtl">
    <FirebaseProvider>
      <RouterProvider router={router}/>
    </FirebaseProvider>
  </FluentProvider>,
);
