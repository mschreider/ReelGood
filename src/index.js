import React from 'react';
import ReactDOM from 'react-dom/client';
import './Resources/index.css';
import './Resources/main.less'
import App from './app.js';
require('dotenv').config()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

