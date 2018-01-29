import {Api, _Api} from '../config/settings';

const initialState = {
    files: ['12kjhjhkhklh'],
    count: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case "GET_ALL":
        {
            const currFiles = [1,2,3];
            const newCount = currFiles.length;
            return {...state,files: ['12321124412412414124']};
        }
        case "ADD_ONE":
        {
            return {...state, count: state.count+1};
        }
        default:
            return state;
    }
}