import React from 'react';
import Image from 'next/image';

interface TaskDetailsProps {
  title: string;
  image: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ title, image }) => {
  return (
    <div >
      <h1 className='text-center font-bold text-lg'>Details:</h1>
      <h2 className="font-bold"> Task Title:</h2><span> {title}</span>
      <img src={image} alt={title} />
    </div>
  );
};

export default TaskDetails;
