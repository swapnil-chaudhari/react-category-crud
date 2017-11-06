import { combineReducers } from 'redux';
import categories from './categories';
import { default as categoryEditor } from './category-editor';
import { default as category } from './category';
import { default as modal } from './modal';
import { default as loadingState } from './loading-state';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    categories,
    category,
    categoryEditor,
    modal,
    loadingState,
});
