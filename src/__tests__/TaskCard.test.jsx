import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../components/TaskCard';

test('renders task card and buttons work', () => {
  const task = { id: 't1', title: 'Test', description: 'Desc', assignee: 'emp1', status: 'Pending', deadline: '2025-11-20' };
  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const onStatusChange = jest.fn();
  render(<TaskCard task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Edit'));
  expect(onEdit).toHaveBeenCalled();
  fireEvent.click(screen.getByText('Delete'));
  expect(onDelete).toHaveBeenCalled();
  fireEvent.click(screen.getByText('Next Status'));
  expect(onStatusChange).toHaveBeenCalled();
});
