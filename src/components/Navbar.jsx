import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Switch } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar(){
  const { user, logout, theme, setTheme } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Task Manager
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={()=> setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light'? <Brightness7Icon/> : <Brightness4Icon/>}
          </IconButton>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
          <Button color="inherit" component={Link} to="/employees">Employees</Button>
          {user ? (
            <>
              <Typography sx={{ ml: 2 }}>{user.name}</Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
