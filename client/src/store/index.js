import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import heroReducer from './reducer/hero'

const reducer = combineReducers({});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
