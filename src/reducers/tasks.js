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
    let id, index;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            let task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status,
            }
            if (!task.id) {
                task.id = randomID();
                state.push(task);
            } else {
                index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            id = action.id;
            index = findIndex(state, id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default myReducer;