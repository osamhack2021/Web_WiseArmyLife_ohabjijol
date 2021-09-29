//client/src/components/App.js
import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router";


import Header from './src/components/Header';


function App(){
    return (
      <div className="App">
          <Switch>
            <Route exact path='/' component={Header} />  
          </Switch>
      </div>
    );
}


export default App;