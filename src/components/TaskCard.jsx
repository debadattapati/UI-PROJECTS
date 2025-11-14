import React from 'react';
import { Card, CardContent, Typography, Chip, CardActions, Button } from '@mui/material';

export default function TaskCard({task, onEdit, onDelete, onStatusChange}){
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{task.description}</Typography>
        <Typography variant="caption">Assignee: {task.assignee}</Typography>
        <Typography variant="caption" sx={{ ml: 2 }}>Deadline: {task.deadline}</Typography>
        <div style={{ marginTop: 8 }}>
          <Chip label={task.status} color={task.status==='Completed' ? 'success' : task.status==='In Progress' ? 'warning' : 'default'} />
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(task)}>Edit</Button>
        <Button size="small" color="error" onClick={() => onDelete(task.id)}>Delete</Button>
        <Button size="small" onClick={() => {
          const next = task.status === 'Pending' ? 'In Progress' : task.status === 'In Progress' ? 'Completed' : 'Pending';
          onStatusChange(task.id, next);
        }}>Next Status</Button>
      </CardActions>
    </Card>
  );
}
