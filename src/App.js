import React, { useEffect } from 'react';
import './stylesheets/App.css';
import { connect } from 'react-redux';
import { getToken } from './actions/sessions'

function App(props) {
  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Store Spender</h1>
      </header>
    </div>
  );
}

export default connect(null, getToken)(App);
