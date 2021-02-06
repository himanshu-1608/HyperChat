import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
export { default as HomePage } from './components/pages/home';
export { default as LoginPage } from './components/pages/login';
export { default as ChatPage } from './components/pages/chat';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
