import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import promise from 'redux-promise';

const enhancer = applyMiddleware(promise);

export default function (initialState){ return createStore(rootReducer, initialState, enhancer) } 