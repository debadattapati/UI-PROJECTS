import React, { useContext, useMemo, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Grid, Paper, Typography, LinearProgress, Box, TextField, MenuItem } from '@mui/material';
import TaskCard from '../components/TaskCard';

export default function Dashboard(){
  const { tasks, updateTask, employees, user } = useContext(TaskContext);
  const [filter, setFilter] = useState('');
  const [empFilter, setEmpFilter] = useState('');

  const filtered = useMemo(()=> tasks.filter(t => (filter ? t.title.toLowerCase().includes(filter.toLowerCase()) : true) && (empFilter ? t.assignee === empFilter : true)), [tasks, filter, empFilter]);

  const counts = useMemo(()=> {
    const byStatus = { Pending:0, 'In Progress':0, Completed:0 };
    tasks.forEach(t => byStatus[t.status] = (byStatus[t.status] || 0) + 1);
    return byStatus;
  }, [tasks]);

  const completionPct = Math.round((counts.Completed / Math.max(1, tasks.length)) * 100);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p:2 }}>
          <Typography variant="h6">Overview</Typography>
          <Typography>Pending: {counts.Pending}</Typography>
          <Typography>In Progress: {counts['In Progress']}</Typography>
          <Typography>Completed: {counts.Completed}</Typography>
          <Box sx={{ mt:2 }}>
            <Typography variant="subtitle2">Completion</Typography>
            <LinearProgress variant="determinate" value={completionPct} />
            <Typography variant="caption">{completionPct}%</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p:2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb:2 }}>
            <TextField placeholder="Search by title" value={filter} onChange={e=>setFilter(e.target.value)} fullWidth />
            <TextField select label="Employee" value={empFilter} onChange={e=>setEmpFilter(e.target.value)} sx={{ minWidth: 200 }}>
              <MenuItem value="">All</MenuItem>
              {employees.map(e => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
            </TextField>
          </Box>
          {filtered.map(t => <TaskCard key={t.id} task={t} onEdit={() => {}} onDelete={() => {}} onStatusChange={(id, s)=> updateTask(id, { status: s })} />)}
        </Paper>
      </Grid>
    </Grid>
  );
}
