
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import IntakeHub from './intakehub/IntakeHub.jsx';
import ProjectHub from './ProjectHub.jsx';
import './index.css';

const currentPath = window.location.pathname;

const isIntakeHub = currentPath === '/intakehub';
const isProjectHub = currentPath === '/intakehub-project';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isIntakeHub ? (
      <IntakeHub />
    ) : isProjectHub ? (
      <ProjectHub />
    ) : (
      <App />
    )}
  </React.StrictMode>
);
