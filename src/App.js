import React, { Component } from 'react';
import './stylesheets/App.css';
import { connect } from 'react-redux';
import { getToken } from './actions/sessions'
import Login from './components/User/Login'
import Signup from './components/User/Signup'

class App extends Component {

  componentDidMount() {
    this.props.getToken()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Store Spender</h1>
          <Signup />
          <Login />
        </header>
      </div>
    )
  }
}

export default connect(null, { getToken })(App);
