import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function Employees(){
  const { employees, tasks } = useContext(TaskContext);

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Employees</Typography>
      <List>
        {employees.map(e => {
          const count = tasks.filter(t => t.assignee === e.id).length;
          return (
            <ListItem key={e.id}>
              <ListItemText primary={e.name} secondary={`${count} tasks`} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
