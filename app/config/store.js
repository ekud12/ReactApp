import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/filesReducer';

const reducers = reducer;

const store = createStore(reducers, applyMiddleware(thunk));

export default store;