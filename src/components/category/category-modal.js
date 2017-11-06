import React, { Component, PropTypes } from 'react';
import Modal from 'src/components/modal/modal';
import { updateCategoryField, clearCategoryEditor } from 'src/actions/category-editor';
import { validateAndSaveCategory } from 'src/actions/validate-and-save-category';
import { reset } from 'src/actions/category-modal';
import { clearCategoryState } from 'src/actions/clear-category-state';
import { connect } from 'react-redux';
import CategoryTitle from './category-title/category-title.js';
import CategoryDescription from './category-description/category-description.js';
import isEmpty from 'lodash.isempty';
import LoadingButton from 'src/components/loading-button/loading-button';
import { intlShape, FormattedMessage } from 'react-intl';
import { Button, Icons } from 'frontend-react-components';
import { fieldErrorMessages } from './i18n';
import { getMessagesForErrors } from 'src/utils/error-handling';

const { Close } = Icons;


class CategoryModal extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        isOpen: PropTypes.bool,
        categoryEdits: PropTypes.object,
        category: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    handleSaveCategory = () => {
        const { dispatch } = this.props;
        return dispatch(validateAndSaveCategory());
    };

    handleFieldChange(field, event) {
        const { dispatch } = this.props;
        return dispatch(updateCategoryField(field, event.target.value));
    }

    handleModalReset = () => {
        const { dispatch } = this.props;
        dispatch(clearCategoryState());
        dispatch(clearCategoryEditor());
        dispatch(reset());
    }

    render() {
        const {
            categoryEditor = {},
            isOpen,
            dispatch,
            category
        } = this.props;
        const { fieldErrors, categoryEdits } = categoryEditor;
        const errorMessages = getMessagesForErrors(fieldErrors, fieldErrorMessages);
        const categoryDetails = {
            ...category,
            ...categoryEdits
        };
        const {
            categoryTitle = '',
            categoryDescription = '',
        } = categoryDetails;

        return (
            <Modal
                className="DeleteConfirmationModal"
                isOpen={ isOpen }
                onRequestClose={ this.handleModalReset.bind(this) }
            >
                <article className="DeleteConfirmationModal-container modal-content">
                    <header className="DeleteConfirmationModal-header modal-header">
                        <h4 className="DeleteConfirmationModal-heading">
                                { !isEmpty(categoryDetails.categoryId) ? 'Edit' : 'Add' } Category
                        </h4>
                        <div className="DeleteConfirmationModal-button-wrapper DeleteConfirmationModal-close" >
                            <Close
                                className="DeleteConfirmationModal-x-icon"
                                onClick={ this.handleModalReset.bind(this) }
                            />
                        </div>
                    </header>
                    <section className="modal-body">
                        <form role="form">
                            <CategoryTitle
                                categoryTitle={ categoryTitle }
                                onChange ={ this.handleFieldChange.bind(this, 'categoryTitle') }
                                errorMessage={ errorMessages.categoryTitle }
                            />

                            <CategoryDescription
                                categoryDescription = { categoryDescription }
                                onChange ={ this.handleFieldChange.bind(this, 'categoryDescription') }
                                errorMessage={ errorMessages.categoryDescription }
                            />
                        </form>
                        <div className="DeleteConfirmationModal-button-wrapper">
                            <Button
                                type="button"
                                className="DeleteConfirmationModal-button"
                                id="cancel-submit"
                                onClick={ this.handleModalReset.bind(this) }
                            >
                                <FormattedMessage
                                    id="delete-modal.cancel"
                                    defaultMessage="CANCEL"
                                />
                            </Button>
                            <LoadingButton
                                type="button"
                                id="confirm-submit"
                                onClick={ this.handleSaveCategory.bind(this) }
                                defaultStyle
                            >
                                <span className="LoadingButton-hide">
                                    <FormattedMessage
                                        id="delete-modal.delete"
                                        defaultMessage='SAVE'
                                    />
                                </span>
                            </LoadingButton>
                        </div>
                    </section>
                </article>
            </Modal>
        );
    }
}

const mapStateToProps = (store) => ({
    categoryEditor: store.categoryEditor
});

export default connect(mapStateToProps)(CategoryModal);
