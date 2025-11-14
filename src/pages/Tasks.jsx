import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Paper, Typography, Button, Dialog, DialogContent, Box, TextField, MenuItem } from '@mui/material';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { toast } from 'react-toastify';

export default function Tasks(){
  const { tasks, addTask, updateTask, deleteTask, user } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const myTasks = user.role === 'admin' ? tasks : tasks.filter(t => t.assignee === user.id);

  const visible = myTasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).sort((a,b) => {
    if(sort === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
    return 0;
  });

  const handleAdd = (data) => {
    if(editing){
      updateTask(editing.id, data);
      toast.success('Task updated');
    } else {
      addTask(data);
      toast.success('Task added');
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <Paper sx={{ p:2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:2 }}>
        <Typography variant="h6">Tasks</Typography>
        <Box>
          <TextField placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} sx={{ mr:1 }} />
          <TextField select value={sort} onChange={e=>setSort(e.target.value)} sx={{ mr:1, minWidth: 140 }}>
            <MenuItem value="">Sort</MenuItem>
            <MenuItem value="deadline">By Deadline</MenuItem>
          </TextField>
          <Button variant="contained" onClick={() => setOpen(true)}>Add Task</Button>
        </Box>
      </Box>

      {visible.map(t => <TaskCard key={t.id} task={t} onEdit={(task)=> { setEditing(task); setOpen(true); }} onDelete={(id)=> { deleteTask(id); toast.info('Task deleted'); }} onStatusChange={(id, s)=> { updateTask(id, { status: s }); toast.success('Status updated'); }} />)}

      <Dialog open={open} onClose={()=> { setOpen(false); setEditing(null); }}>
        <DialogContent>
          <TaskForm defaultValues={editing || {}} onSubmit={handleAdd} onCancel={()=> { setOpen(false); setEditing(null); }} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
