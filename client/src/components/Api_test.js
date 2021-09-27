import React, { Component } from 'react';
const axios = require('axios');

class App extends Component {
  state = {
    response: '',
  };
  
//페이지 로드시 실행 GET TEST
componentDidMount() { // react 내장함수 페이지가 로드
  this.callApi()
    .then(res => this.setState({ response: res.express }))
    .catch(err => console.log(err));
}

callApi = async () => { // async 비동기 특성때문에 사용 promise
  try {
    
    const response = await fetch('/auth/login'); // server.js get방식 /user호출 api받아오기
    const body = await response.json();
    alert(body.data)
    if (response.status !== 200) throw Error(body.message);
    return body;
  } catch (error) {
    alert(error)
  }
};

// post 호출하기 버튼 클릭시 node api post 호출
submitClick = async e => {

  

  axios.post('/auth/login', {    

  })
  .then( response => {
      alert(response.data.message)
  })  

}

render() {
    return (
        <div>
          
          <button className="s_bt" type="submit" onClick={this.submitClick}>post 호출</button>
        </div>
    );
  }
}

export default App;