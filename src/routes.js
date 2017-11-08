import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import Category from 'src/components/category/category';
import { enableLoadingState } from 'src/actions/loading-state';

const Routes = ({ dispatch, history }) => (
    <Router history={ history }>
        <Route>
            <Route
                path="/"
                component={ Category }
                onEnter={ (replace, done) => {
                dispatch(enableLoadingState());
                done();
            } }
            />
            <Route
                path="/categories"
                component={ Category }
            />
        </Route>
    </Router>
);

Routes.propTypes = {
    history: PropTypes.object
};

export default Routes;
