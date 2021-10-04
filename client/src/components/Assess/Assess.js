import React from 'react';
import axios from 'axios';

const Assess = () => {
    
    async function callGet() {
        axios.get(`/community/1/1`)
        .then(res => {
            console.log(res.data)
        })
    }

    async function callPost() {
        axios.post(`/assessment`,{
            
        })
        .then(res => {
            console.log(res.data)
        })
    }

    return (
        <div>
            <button onClick={callGet}>get호출</button>
            <button>post호출</button>
        </div>
    );
};

export default Assess;