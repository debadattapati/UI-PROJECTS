import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { TaskContext } from '../context/TaskContext';

export default function TaskForm({ defaultValues={}, onSubmit, onCancel }){
  const { employees } = useContext(TaskContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  useEffect(()=> reset(defaultValues), [defaultValues, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2 }}>
      <TextField label="Title" {...register('title', { required: 'Title required' })} error={!!errors.title} helperText={errors.title?.message} />
      <TextField label="Description" {...register('description')} multiline rows={3} />
      <TextField select label="Assignee" {...register('assignee', { required: 'Assignee required' })} defaultValue={defaultValues.assignee || ''} error={!!errors.assignee}>
        {employees.map(e => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
      </TextField>
      <TextField type="date" label="Deadline" InputLabelProps={{ shrink: true }} {...register('deadline', { required: 'Deadline required' })} error={!!errors.deadline} />
      <TextField select label="Status" defaultValue={defaultValues.status || 'Pending'} {...register('status')}>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained">Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
}
