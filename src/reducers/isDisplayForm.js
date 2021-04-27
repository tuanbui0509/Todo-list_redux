import *as types from '../constants/actionTypes'
// Gan gia tri vao cho initialState close form
let initialState = false;

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM:
            return !state;
        case types.CLOSE_FORM:
            return false;
        case types.OPEN_FORM:
            return true;
        default:
            return state;
    }
}

export default myReducer;