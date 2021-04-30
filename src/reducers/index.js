import {combineReducers} from 'redux';
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import taskEditing from './TaskEditing'
import filterTable from './FilterTable'
import searchTask from './Search'
import sortTask from './Sort'

const myReducer = combineReducers({
    tasks,// task =task
    isDisplayForm,
    taskEditing,
    filterTable,
    searchTask,
    sortTask
});

export default myReducer;
