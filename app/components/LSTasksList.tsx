'use client'
import React, { useState,useEffect } from 'react';

 export interface LSTask {
  id: number;
  title: string;
  completed: boolean;
  category: string;
}

interface LSTaskListProps {
  category: string;
  completeTask: (taskId: number) => void;
}

const LSTaskList: React.FC<LSTaskListProps> = ({ category, completeTask }) => {
  const [tasks, setTasks] = useState<LSTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  useEffect(() => {
    const savedTasks: LSTask[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks.filter((task: LSTask) => task.category === category)); 
  }, [category]);

  const saveTasksToLocalStorage = (updatedTasks: LSTask[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
  const handleCheckboxChange = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };
  
  const handleDeleteTask = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
      return updatedTasks;
    });
  };
  const handleAddTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask: LSTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        completed: false,
        category: category,
      };
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
        return updatedTasks;
      });
      setNewTaskTitle('');
    }
  };
    /* 
      This was a bug i faced due to not filtering the two lists by their category too. the tasks were being seen in all categories.
      const activeTasks = tasks.filter(task => !task.completed);
      const completedTasks = tasks.filter(task => task.completed); 
      */
  const activeTasks = tasks.filter(task => !task.completed && task.category === category);
  const completedTasks = tasks.filter(task => task.completed && task.category === category);

  return (
    <div>
      <p className="text-lg mb-6 font-bold">Active Tasks</p>
      {activeTasks.length === 0 ? (
        <p>No active tasks</p>
      ) : (
        activeTasks.map((task, index) => (
          <div key={index} className="task rounded-lg flex items-center justify-between">
            <input
              className="form-check-input custom-checkbox me-2 text-red-800"
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id)}
            />
            <p>{task.title}</p>
            <div className="ml-auto">
                <button 
                onClick={() => handleDeleteTask(task.id)}
                className="border-2 border-black rounded-lg"
                >Delete</button>
            </div>
          </div>
        ))
      )}

      <p className="text-lg mb-6 mt-7 font-bold">Completed Tasks</p>
      {completedTasks.length === 0 ? (
        <p>No completed tasks</p>
      ) : (
        completedTasks.map((task, index) => (
          <div key={index} className="task rounded-lg flex items-center justify-content-between">
            <input
              className="form-check-input custom-checkbox me-2 text-red-800"
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id)}
            />
            <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</p>
            <div className="ml-auto">
                <button 
                onClick={() => handleDeleteTask(task.id)}
                className="border-2 border-black rounded-lg"
                >Delete</button>
            </div>
          </div>
        ))
      )}
        <div>
          <input 
          className='mt-10 w-5/6 p-2 rounded-md'
            type="text"
            placeholder="Add a task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button 
            onClick={handleAddTask}
            className='border-2 border-black rounded-lg w-32 mt-2 ml-3'>
                Add Task
          </button>
        </div>
    </div>
  );
};

export default LSTaskList;
