import { CATEGORIES_FETCHED, CATEGORIES_FETCHED_FAILURE } from 'src/action-types';

const initialState = [];

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case CATEGORIES_FETCHED:
            return [...payload];
        case CATEGORIES_FETCHED_FAILURE:
            return initialState;
        default:
            return state;
    }
};
