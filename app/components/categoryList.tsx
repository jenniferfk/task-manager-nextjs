'use client'
import { useState,useEffect } from 'react';
import APITaskList from './apitasksList';
import LSTaskList from './LSTasksList'; 
import { LSTask } from './LSTasksList';
import { completeTask as completeTaskAction } from '../redux/actions/taskActions';

type Category = string;
 
export default function CategoryList() {
  const defaultCategories: Category[] = ['API Tasks'];
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(localStorage.getItem('categories') || JSON.stringify(defaultCategories))
  );
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [apiTasksFetched, setApiTasksFetched] = useState(false);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        if (category === 'API Tasks' && !apiTasksFetched) {
            setApiTasksFetched(true);
        }
    };
    useEffect(() => {
      setCategories(JSON.parse(localStorage.getItem('categories') || JSON.stringify(defaultCategories)));
    }, []);
    const [tasks, setTasks] = useState<LSTask[]>([]);

    
    const handleDeleteCategory = (categoryToDelete: string) => {
      const updatedCategories = categories.filter(category => category !== categoryToDelete);
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      
      //without the code below, a bug was being shown which makes the tasks still showing if i selected a category and deleted it while selecting it
      //so what i did is set the category selected to null(if i delete it) so that when i delete a category, everything is gone.
      if (selectedCategory === categoryToDelete) {
        setTasks([]); 
        setSelectedCategory(null); 
      } else {
        const updatedTasks = tasks.filter(task => task.category !== categoryToDelete);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }
        };
        //.
    const handleAddCategory = () => {
      const newCategoryInput = document.getElementById('newcat') as HTMLInputElement;
      const newCategory = newCategoryInput.value;
      if (newCategory.trim() !== '') {
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
        newCategoryInput.value = '';
      }
    };
    const completeTask = (taskId: number) => {
      return completeTaskAction(taskId); 
  };

    return (
        <div className=''>
            <div className='container lg:flex maindiv mt-9 border p-0 '>
                <div className="w-35 bg-gray-200 p-4">
                    <p className="text-lg mb-6 font-bold">Task Categories</p>
                    {categories.map((category) => (
                      <div key={category} className='mt-2 mt-2 flex justify-between items-center'>
                        <a onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer', fontWeight: selectedCategory === category ? 'bold' : 'normal'}}>
                         - {category}</a>
                          {category !== 'API Tasks' && (
                          <button
                          className="ml-2 text-red-500 ml-auto"
                          onClick={() => handleDeleteCategory(category)}
                          >
                          🗑️
                        </button>
                          )}
                      </div>
                    ))}
                    <div className='flex flex-col items-center mt-9'>
                      <input 
                        id="newcat"
                        type="text"
                        placeholder='Add a Category'
                      />
                      <button 
                        className='border-2 border-black rounded-lg w-32 mt-2 '
                        onClick={handleAddCategory}
                      >
                        Add Category
                      </button> 
                    </div>
                    
                </div>
                <div className="flex-1 p-4">
                {selectedCategory === 'API Tasks' && apiTasksFetched ? (
                  <APITaskList category={selectedCategory} completeTask={completeTask}  /> 
                ) : selectedCategory !== null ? (
                  <LSTaskList category={selectedCategory} completeTask={completeTask} />
                ) : (
                  <p className='text-center text-xl font-bold text-white'>Click or Add a category</p>
                )}
                      
                </div>
            </div>
        </div>
    );
}