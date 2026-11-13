
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import IntakeHub from './intakehub/IntakeHub.jsx';
import './index.css';

const isIntakeHub = window.location.pathname.startsWith('/intakehub');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isIntakeHub ? <IntakeHub /> : <App />}
  </React.StrictMode>
);
