import *as types from './../constants/actionTypes'

let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

let randomID = () => {
    return s4() + s4() + s4() + s4(); // Example => 'e014026082e6237b'
}
let data = JSON.parse(localStorage.getItem('tasks'));
let initialState = data ? data : [];

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            let newTask = {
                id: randomID(),
                name: action.task.name,
                status: action.task.status === 'false' ? false : true,
            }
            console.log(newTask);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default myReducer;