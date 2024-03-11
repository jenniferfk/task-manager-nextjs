'use client'
import { useEffect, useState } from 'react';
import TaskDetails from './TaskDetails';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  image:string;
}

interface TaskListProps {
  category: string;
  completeTask: (taskId: number) => void;
}

const APITaskList: React.FC<TaskListProps> = ({ category, completeTask }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task); 
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://dev-api.almashhad.tv/api/videos/detailsElastic/182622880654874');
        if (response.ok) {
          const data = await response.json();
          const relatedTasks = data?.data?.result?.related.map((task: Task) => ({
            id: task.id,
            title: task.title,
            completed: false,
            image: task.image
          }));
          if (relatedTasks) {
            setTasks(relatedTasks);
          }
        } else {
          throw new Error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false); // so i can stop the loading spinner and display the content 
      }
    };

    fetchTasks();
  }, []);

  const handleCheckboxChange = (taskId: number) => {
    completeTask(taskId);
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="spinner-border">Loading...</div>
      </div>
    );
  }
  return (
<div>
      {selectedTask ? ( 
        <div>
          <button className="border-2 rounded-md text-white" onClick={() => setSelectedTask(null)}>Go Back</button> 
          <TaskDetails title={selectedTask.title} image={selectedTask.image} />
        </div>
      ) : (
        <div>
        <p className="text-lg mb-6 font-bold">Active Tasks</p>
      {activeTasks.map((task, index) => (
        <div key={index} className="task rounded-lg flex items-center justify-content-between">
          <input
            className="form-check-input custom-checkbox me-2 text-red-800"
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCheckboxChange(task.id)}
          />
          <p>{task.title}</p>
          <div className="ml-auto">
                <button 
                className=" text-blue-500 "
                onClick={() => handleViewDetails(task)}
                >View Details</button>
            </div>
        </div>
      ))}

      <p className="text-lg mb-6 mt-7 font-bold">Completed Tasks</p>
      {completedTasks.map((task, index) => (
        <div key={index} className="task rounded-lg flex items-center justify-content-between">
        <input
          className="form-check-input custom-checkbox me-2 text-red-800"
          type="checkbox"
          checked={task.completed}
          onChange={() => handleCheckboxChange(task.id)}
        />
        <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</p>
      </div>
      ))}
        </div>
      )}
    </div>
  );
};

export default APITaskList;
