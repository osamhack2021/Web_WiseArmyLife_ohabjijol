import React, {Component} from "react";
import Header from './components/HeadList/Header';
import Footer from './components/HeadList/Footer';




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