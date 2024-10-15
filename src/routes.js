// src/routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageList from './components/PageList';
import PageDetail from './components/PageDetail';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={PageList} />
                <Route path="/game/:slug" component={PageDetail} />
            </Switch>
        </Router>
    );
};

export default Routes;
