import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
// Suppress ResizeObserver error
const resizeObserverErrHandler = (e) => {
  if (e.message && e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    e.preventDefault(); // Suppress the error
  }
};

window.addEventListener('error', resizeObserverErrHandler);
