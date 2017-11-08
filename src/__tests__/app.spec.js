import React from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createNewStore } from 'src/store';
import Routes from 'src/routes';
import renderShallow from 'render-shallow';
import { expect } from 'chai';
import App from 'src/app';

describe('<App>', () => {
    describe('render routes', () => {
        context('When it renders', () => {
            let component;
            const store = createNewStore();
            before(() => {
                component = renderShallow(<App />).output;
            });

            it('renders a list of routes', () => {
                expect(component).to.eql(
                    <Provider store={ store }>
                        <Routes dispatch={ store.dispatch } history={ browserHistory } />
                    </Provider>
                );
            });
        });
    });
});
