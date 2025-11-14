export const users = [
  { id: 'emp1', name: 'Alice Employee', role: 'employee', password: 'emp' },
  { id: 'emp2', name: 'Bob Employee', role: 'employee', password: 'emp' },
  { id: 'admin', name: 'Admin User', role: 'admin', password: 'admin' }
];

export const initialTasks = [
  {
    id: 't1',
    title: 'Prepare monthly report',
    description: 'Compile sales and performance metrics',
    assignee: 'emp1',
    status: 'Pending',
    deadline: '2025-11-20'
  },
  {
    id: 't2',
    title: 'Fix issue #432',
    description: 'Investigate production error',
    assignee: 'emp2',
    status: 'In Progress',
    deadline: '2025-11-18'
  },
  {
    id: 't3',
    title: 'Onboard new hire',
    description: 'Set up accounts and training plan',
    assignee: 'emp1',
    status: 'Completed',
    deadline: '2025-11-10'
  }
];
