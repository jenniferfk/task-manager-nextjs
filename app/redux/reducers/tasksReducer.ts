import { Task } from '../../components/apitasksList';
import { combineReducers } from 'redux';
import { COMPLETE_TASK } from '../actions/taskActions';
import { ADD_CATEGORY, AddCategoryAction } from '../actions/categoryActions';

interface TaskState {
  tasks: Task[];
}
interface CategoryState {
  categories: string[];
}

const tasksinitialState: TaskState = {
  tasks: [],
};
const categoryinitialState:  CategoryState ={
  categories: ['API Tasks'],
};
type CategoryActionTypes = AddCategoryAction;

const categoryReducer = (state = categoryinitialState, action: CategoryActionTypes): CategoryState => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    default:
      return state;
  }
};

const tasksReducer = (state = tasksinitialState, action: any) => {
  switch (action.type) {
    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, completed: true } : task
        ),
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  tasks: tasksReducer,
  categories: categoryReducer,
})

export default rootReducer;
