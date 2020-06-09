import React, { Component } from 'react';
import logo from './logo.svg';
import './stylesheets/App.css';
import './stylesheets/responsive.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

class App extends Component() {

  render() {
    return (
      <div className="App">
        <h1>Store Spender</h1>
      </div>
    );
  }
}

export default App;
