import *as types from './../constants/actionTypes'

let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

let randomID = () => {
    return s4() + s4() + s4() + s4(); // Example => 'e014026082e6237b'
}

const findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, idx) => {
        if (task.id === id) result = idx;
    });
    return result;
}
// Lay du lieu tren local stored
let data = JSON.parse(localStorage.getItem('tasks'));
// Gan gia tri vao cho initialState ha
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
            state.push(newTask);
            console.log(state);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            let id = action.id;
            let index = findIndex(state, id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default myReducer;