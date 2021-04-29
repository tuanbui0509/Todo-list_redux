import {combineReducers} from 'redux';
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import taskEditing from './TaskEditing'

const myReducer = combineReducers({
    tasks,// task =task
    isDisplayForm,
    taskEditing
});

export default myReducer;
