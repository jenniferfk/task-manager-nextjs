import { createStore } from 'redux';
import rootReducer from './reducers/tasksReducer';

const store = createStore(rootReducer);

export default store;
