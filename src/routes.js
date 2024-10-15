import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Chargement paresseux des composants
const PageList = lazy(() => import('./components/PageList'));
const PageDetail = lazy(() => import('./components/PageDetail'));

const Routes = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/" exact component={PageList} />
                    <Route path="/game/:slug" component={PageDetail} />
                    <Route path="*" component={() => <div>404 Not Found</div>} /> // Route de fallback
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Routes;
