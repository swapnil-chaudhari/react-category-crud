import React from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createNewStore } from 'src/store';
import Routes from 'src/routes';
import 'src/app.scss';

const App = () => {
    const store = createNewStore();
    return (
        <Provider store={ store }>
            <Routes
                dispatch={ store.dispatch }
                history={ browserHistory }
            />
        </Provider>
    );
};

export default App;
