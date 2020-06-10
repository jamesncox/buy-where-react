import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './stylesheets/App.css';
import { connect } from 'react-redux';
import { getToken } from './actions/sessions'

import Header from './components/Layout/Header'
import Home from './components/Layout/Home'
import Login from './components/User/Login'
import Signup from './components/User/Signup'

class App extends Component {

  componentDidMount() {
    this.props.getToken()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(null, { getToken })(App);
