import React from 'react';
import axios from 'axios';

const Assess = () => {
    
    async function callGet() {
        axios.get(`/assessment`)
        .then(res => {
            console.log(res.data)
        })
    }

    const data= {
        'hello':'world'
    }

    const callPost = () => {
        console.log('a')
        axios.post('/',data)
        .then( response => {
            console.log(data);

        })
    }

    return (
        <div>
            <button onClick={callGet}>get호출</button>
            <div>
                <button onClick={callPost}>post호출</button>
            </div>
        </div>
    );
};

export default Assess;