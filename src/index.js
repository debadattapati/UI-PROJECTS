import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </TaskProvider>
  </React.StrictMode>
);
