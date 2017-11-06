import React, { Component, PropTypes } from 'react';
import getCategories from 'src/actions/get-categories';
import { opened } from 'src/actions/category-modal';
import { connect } from 'react-redux';
import Categories from './categories';
import CategoryModal from './category-modal';
import { RECENT_CATEGORIES_HEADER } from 'src/constants';
import { LoadingIndicator } from 'frontend-react-components';
import { intlShape, FormattedMessage } from 'react-intl';
import { Button } from 'frontend-react-components';

class Content extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        categories: PropTypes.array,
        isOpen: PropTypes.bool,
        category: PropTypes.object,
        loadingState: PropTypes.bool.isRequired
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getCategories());
    }

    render() {
        const {
            categories,
            isOpen,
            category,
            loadingState,
            dispatch,
         } = this.props;
        let headers = RECENT_CATEGORIES_HEADER;

        return (
            <div id="page-wrapper" className="page-flower">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">
                                Categories <small>List</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li className="active">
                                    <i className="fa fa-dashboard"></i> Categories
                                </li>
                            </ol>
                            <div className="col-sm-12">
                                <CategoryModal
                                    isOpen={ isOpen }
                                    dispatch= { dispatch }
                                    category= { category }
                                />

                                <Button
                                    type="button"
                                    className="btn btn-primary add-category-btn"
                                    id="cancel-submit"
                                    onClick={ () => dispatch(opened()) }
                                >
                                    <FormattedMessage
                                        id="add-category"
                                        defaultMessage="ADD CATEGORY"
                                    />
                                </Button>

                                {
                                    loadingState
                                    ?
                                    <div className="loading-state">
                                        <LoadingIndicator />
                                    </div>
                                    :
                                        <Categories
                                            header={ headers }
                                            rows={ categories }
                                            dispatch= { dispatch }
                                        />
                                 }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => ({
    categories: store.categories,
    isOpen: store.modal.isOpen,
    category:store.category,
    loadingState: store.loadingState
});

export default connect(mapStateToProps)(Content);
