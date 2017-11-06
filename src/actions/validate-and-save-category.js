import { saveCategory } from 'src/actions/save-category';
import {
    clearCategoryEditor,
    categorySaveError,
} from 'src/actions/category-editor';
import { reset } from 'src/actions/category-modal';
import getCategories from 'src/actions/get-categories';
import categorySchema from 'src/actions/data/category-schema.json';
import { toCamel } from 'src/utils/object-keys';
import { getErrors } from 'src/utils/error-handling';
import omit from 'lodash.omit';
import { ERROR_CODES } from 'src/constants';
import { enableLoadingState } from 'src/actions/loading-state';

export const validateAndSaveCategory = () => (dispatch, getState) => {

    const {
        category: categoryToUpdate,
        categoryEditor: { categoryEdits }
    } = getState();

    const categoryToSave = {
        ...categoryToUpdate,
        ...categoryEdits
    };

    let categoryToValidate = omit(categoryToSave, [
        'categoryId'
    ])
    let schema;
    schema = toCamel(categorySchema);

    const errors = getErrors(categoryToValidate, schema);

    if (errors) {
        return dispatch(categorySaveError(
            errors,
            ERROR_CODES.VALIDATION_ERROR
        ));
    }

    return dispatch(saveCategory(categoryToSave))
        .then((savedCategory) => {
            dispatch(clearCategoryEditor());
            dispatch(reset());
            dispatch(enableLoadingState());
            dispatch(getCategories());
        })
        .catch((err) => {
            dispatch(categorySaveError(err.response.data.results, err.response.status));
        });
}
