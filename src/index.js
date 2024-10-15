import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App'; // ton composant principal
import GameDetail from './components/GameDetail'; // composant pour les détails d'un jeu

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/game/:slug" component={GameDetail} />
            {/* Ajoute d'autres routes ici si nécessaire */}
        </Switch>
    </Router>,
    document.getElementById('app')
);
