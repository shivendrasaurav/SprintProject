import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import "fdweb/fluent-icons.css";
import "fdweb/fluent.css";
import "./App.css";
import AppView from './components/AppViewComp';
import Login from './components/LoginComp';
import Signup from './components/SignupComp';
import ProfileView from './components/ProfileViewComp';
import SavedJobsView from './components/SavedJobsViewComp';

const App = () =>{

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/app/jobs" component={AppView} />
          <Route path="/app/saved" component={SavedJobsView} />
          <Route path="/app/profile" component={ProfileView} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </Fragment>
  );  
}

export default App;
