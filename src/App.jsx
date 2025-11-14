import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Employees from './pages/Employees';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { TaskContext } from './context/TaskContext';

export default function App(){
  const { user } = useContext(TaskContext);
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="/employees" element={user && user.role==='admin' ? <Employees /> : <Navigate to="/" />} />
        </Routes>
      </Container>
      <ToastContainer position="top-right" />
    </>
  );
}
