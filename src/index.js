import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// Suppress ResizeObserver errors
const resizeObserverErrHandler = (err) => {
  if (err.message && err.message.includes('ResizeObserver loop limit exceeded')) {
    // Prevent error from showing up in the console
    console.warn('Suppressed ResizeObserver loop limit exceeded error');
    err.preventDefault();
  }
};

window.addEventListener('error', resizeObserverErrHandler);
window.addEventListener('unhandledrejection', resizeObserverErrHandler);
