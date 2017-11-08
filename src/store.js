import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'src/reducers';
import { routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';

const initialState = {};
export const createNewStore = (state = initialState) => (
    createStore(
        combineReducers({
            ...reducers,
            routing: routerReducer
        }),
        state,
        applyMiddleware(
            thunk,
            // createLogger({ predicate: () => process.env.NODE_ENV === 'development' })
        )
    )
);

let store;
export const getStore = () => store || (store = createNewStore());
