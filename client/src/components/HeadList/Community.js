import React from 'react';
import { testGet,testPost } from '../../Custom/serverAPI';
import axios from 'axios';
import { Component } from 'react';

const data =[
    {
        
    },
    {

    }
]

class Community extends Component{
/*
    state = {
        response: ''
    };


//페이지 로드시 실행 GET TEST
componentDidMount() { // react 내장함수 페이지가 로드
    this.callApi()
    .then(res => this.setState({ response: res.data }))
    .catch(err => console.log(err));
}

callApi = async () => { // async 비동기 특성때문에 사용 promise
    try {
        const response = await fetch('/community'); // server.js get방식 /user호출 api받아오기
        const body = await response.json();
        alert(body.data)
        if (response.status !== 200) throw Error(body.message);
            return body;
    } catch (error) {
        alert(error)
    }
};
*/

    render() {
        

        return (
             <div>{this.state.response}</div>
        );
    }

};


export default Community;