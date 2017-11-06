import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'src/reducers';
import createLogger from 'redux-logger';
const middleware = applyMiddleware(thunk, createLogger);

export default createStore(reducer, middleware);
