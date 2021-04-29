import {combineReducers} from 'redux';
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import taskEditing from './TaskEditing'
import filterTable from './FilterTable'

const myReducer = combineReducers({
    tasks,// task =task
    isDisplayForm,
    taskEditing,
    filterTable
});

export default myReducer;
