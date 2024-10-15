import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = React.lazy(() => import('./App'));
const GameDetail = React.lazy(() => import('./components/GameDetail'));

ReactDOM.render(
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/game/:slug" component={GameDetail} />
                {/* Ajoute d'autres routes ici si nécessaire */}
            </Switch>
        </Suspense>
    </Router>,
    document.getElementById('app')
);
