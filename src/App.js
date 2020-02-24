import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MoviePage from './Pages/MoviePage/MoviePage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/movie/:id" component={MoviePage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;