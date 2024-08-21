import * as types from '../type/types';

const initialState = {

    isMenu : false,
}

const personalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SETMENUVIEW:
            return {
                ...state,
                isMenu : action.view
            }
        default:
            return state;
    }
}

export default personalReducer;