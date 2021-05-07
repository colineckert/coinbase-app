import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
// import './reset.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<App />, rootEl);
});