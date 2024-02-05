import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './components/styles/spacings.css';
import './components/styles/layout.css';
import { App } from './components/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FluentProvider } from '@fluentui/react-components';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AppTheme } from './theme';
import { QuestionnairesConfig } from './back-office/QuestionnairesConfig';
import { Home } from './components/Home';
import { FirebaseProvider } from './networking/firebase';
import { Login } from './back-office/Login';
import { ProtectedRoute } from './back-office/protected-route';
import { QuestionnairesData } from './back-office/QuestionnairesData';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <ErrorBoundary><App/></ErrorBoundary>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/manage',
        element: <ProtectedRoute><Outlet/></ProtectedRoute>,

        children: [
          {
            path: 'questionnaires',
            element: <QuestionnairesConfig />,
          },
          {
            path: 'data',
            element: <QuestionnairesData />,
          },
        ],
      }
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
