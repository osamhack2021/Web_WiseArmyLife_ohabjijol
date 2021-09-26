//client/src/components/App.js
import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router";

import Api_test from './Api_test'

class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
    }
}
  componentDidMount() {}
  render () {
    return (
      <div className="App">
          <Switch>
            <Route exact path='/' component={Api_test} /> 
            <Route path='/Api_test' component={Api_test} />
          </Switch>
      </div>
    );
  }
}

export default App;