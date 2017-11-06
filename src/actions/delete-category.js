import axios from 'axios';
import { clearCategoryState } from 'src/actions/clear-category-state';
import getCategories from 'src/actions/get-categories';
import { CATEGORY_ENDPOINT } from 'src/constants';
import { enableLoadingState } from 'src/actions/loading-state';

export const deleteCategory = categoryId => dispatch => {
    return axios.delete(`${CATEGORY_ENDPOINT}?id=${categoryId}`).then((response) => {
        dispatch(clearCategoryState());
        dispatch(enableLoadingState());
        return dispatch(getCategories());
    });
};
