
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import IntakeHub from './intakehub/IntakeHub.jsx';
import ProjectHub from './ProjectHub.jsx';
import './index.css';

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

let page;

if (currentPath === '/intakehub') {
  page = <IntakeHub />;
} else if (currentPath === '/intakehub-project') {
  page = <ProjectHub />;
} else {
  page = <App />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>{page}</React.StrictMode>
);
