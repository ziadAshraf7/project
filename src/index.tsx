import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App.tsx"
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);

