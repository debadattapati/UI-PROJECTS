import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login(){
  const { login } = useContext(TaskContext);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const res = login({ id, password });
    if(res.ok){
      toast.success('Logged in');
      navigate('/');
    } else {
      toast.error(res.message || 'Login failed');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Login</Typography>
      <Box component="form" onSubmit={handle} sx={{ display: 'grid', gap: 2 }}>
        <TextField label="User ID" value={id} onChange={e=>setId(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button variant="contained" type="submit">Login</Button>
      </Box>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>Try admin/admin or emp/emp</Typography>
    </Paper>
  );
}
