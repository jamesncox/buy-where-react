import React, { Component } from 'react';
import './stylesheets/App.css';
import { connect } from 'react-redux';
import { getToken } from './actions/sessions'

import Header from './components/Layout/Header'
import Login from './components/User/Login'
import Signup from './components/User/Signup'

class App extends Component {

  componentDidMount() {
    this.props.getToken()
  }

  render() {
    return (
      <div className="App">

        <Header />
        <Signup />
        <Login />

      </div>
    )
  }
}

export default connect(null, { getToken })(App);
