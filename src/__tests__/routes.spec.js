import React from 'react';
import { expect } from 'chai';
import Routes from 'src/routes';
import Category from 'src/components/category/category';
import { Router, Route, browserHistory } from 'react-router';
import { enableLoadingState } from 'src/actions/loading-state';
import renderShallow from 'render-shallow';
import { spy, stub, mock } from 'sinon';
import noop from 'src/utils/noop';

describe('<Routes>', () => {
    const renderRoutes = (dispatch) => {
        return renderShallow(<Routes
            dispatch={ dispatch }
            history={ browserHistory }
        />);
    };

    context('when it renders', () => {
        let component;
        before(() => {
            component = renderRoutes().output;
        });

        it('renders a <Router>', () => {
            expect(component.type).to.equal(Router);
        });

        it('uses app history', () => {
           expect(component.props.history).to.equal(browserHistory);
       });

       it('renders the default routes', () => {
            expect(component).to.include(
                <Route
                    path="/"
                    component={ Category }
                    onEnter={ noop }
                />
            );
        });

       it('renders the category routes', () => {
            expect(component).to.include(
                <Route
                    path="/categories"
                    component={ Category }
                />
            );
        });
    });
});
