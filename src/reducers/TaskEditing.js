import *as types from '../constants/actionTypes'
// Gan gia tri vao cho initialState close form
let initialState = {};

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_TASK:
            return action.task;
        default:
            return state;
    }
}

export default myReducer;