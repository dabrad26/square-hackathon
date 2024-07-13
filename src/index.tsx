import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.scss';
import App from './views/App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Router basename='/square-hackathon'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
);
