import React, {useState,Component} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from './Login';
import DetailHome from "./DetailHome";
import Community from './Community';
import Assess from "./Assess";
import Header from "./Header";
import Footer from "./Footer";


class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
    }
}
  componentDidMount() {}
  render () {
    

    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;