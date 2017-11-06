import axios from 'axios';
import { disableLoadingState } from 'src/actions/loading-state';
import {
    CATEGORIES_FETCHED,
    CATEGORIES_FETCHED_FAILURE,
} from 'src/action-types';
import { CATEGORY_ENDPOINT } from 'src/constants';

const categoriesFetched = categories => ({
    type: CATEGORIES_FETCHED,
    payload: categories,
});

const categoriesFetchedFailure = error => ({
    type: CATEGORIES_FETCHED_FAILURE,
    payload: error,
});

export default function getCategories() {
    return (dispatch) =>
        axios.get(CATEGORY_ENDPOINT)
        .then(response => {
            const categories = response.data;
            return categories;
        })
        .then(categories => {
            dispatch(categoriesFetched(categories));
            dispatch(disableLoadingState());
        })
        .catch(error => dispatch(categoriesFetchedFailure(error)));

}
