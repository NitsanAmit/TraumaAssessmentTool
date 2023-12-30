import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './components/styles/spacings.css';
import './components/styles/layout.css';
import { App } from './components/App';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <FluentProvider theme={teamsLightTheme} dir="rtl">
    <App/>
  </FluentProvider>,
);
