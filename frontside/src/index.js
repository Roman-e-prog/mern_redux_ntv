import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import {store} from "../src/app/store";
import ErrorBoundary from './components/ErrorBoundary';
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);

