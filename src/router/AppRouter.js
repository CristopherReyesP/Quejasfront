import React from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router, } from 'react-router-dom';
import { QuejasPage } from '../pages/QuejasPage';

export const AppRouter = () => {
    return (
        <Router>
        <div>
          <Switch>
          <Route path='/' component={QuejasPage} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
    )
}
