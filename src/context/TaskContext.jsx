import React, { createContext, useEffect, useState } from 'react';
import { users, initialTasks } from '../utils/mockData';
import { v4 as uuidv4 } from 'uuid';

export const TaskContext = createContext();

export function TaskProvider({ children }){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('etm_user')) || null);
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('etm_tasks')) || initialTasks);
  const [employees] = useState(users.filter(u => u.role === 'employee'));
  const [theme, setTheme] = useState(localStorage.getItem('etm_theme') || 'light');

  useEffect(()=>{
    localStorage.setItem('etm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(()=>{
    localStorage.setItem('etm_user', JSON.stringify(user));
  }, [user]);

  useEffect(()=>{
    localStorage.setItem('etm_theme', theme);
    if(theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [theme]);

  function login({ id, password }){
    const found = users.find(u => u.id === id && u.password === password);
    if(found){
      setUser(found);
      return { ok: true, user: found };
    }
    return { ok: false, message: 'Invalid credentials' };
  }

  function logout(){
    setUser(null);
  }

  function addTask(task){
    const newTask = { ...task, id: uuidv4() };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }

  function updateTask(id, changes){
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t));
  }

  function deleteTask(id){
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <TaskContext.Provider value={{
      user, login, logout, tasks, addTask, updateTask, deleteTask, employees, theme, setTheme
    }}>
      {children}
    </TaskContext.Provider>
  );
}
