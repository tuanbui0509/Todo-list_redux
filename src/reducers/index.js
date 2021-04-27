import {combineReducers} from 'redux';
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import TaskEditing from './TaskEditing'

const myReducer = combineReducers({
    tasks,// task =task
    isDisplayForm,
    TaskEditing
});

export default myReducer;
