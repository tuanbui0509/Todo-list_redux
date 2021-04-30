import *as types from '../constants/actionTypes'
// Gan gia tri vao cho initialState close form
let initialState = {
    by: 'name',
    value: 1 // 1 tăng 0 giảm 
};

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return{
                by: action.sort.by,
                value: parseInt(action.sort.value)
            };
        default:
            return state;
    }
}

export default myReducer;