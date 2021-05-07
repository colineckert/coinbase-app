import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import './index.css';
// import './reset.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<Root />, rootEl);
});