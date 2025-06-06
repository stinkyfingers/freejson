import React from 'react';
import './index.css';
import App from './App';
import { hydrateRoot, createRoot } from 'react-dom/client';
import loadScripts from 'snapshotify';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  // Page was pre-rendered — hydrate it
  loadScripts().then(() => {
    hydrateRoot(rootElement, <React.StrictMode><App /></React.StrictMode>);
  });
} else {
  // No pre-rendered content — do a client-side render
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
