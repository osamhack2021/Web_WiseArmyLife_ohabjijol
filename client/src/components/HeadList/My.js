import React,{useEffect} from 'react';
import axios from 'axios';

const my = () => {
    useEffect(() => {
        axios.get('/M')
        .then(res => console.log(res))
        .catch()
    },[])

    return (
        <div>
            My
        </div>
    );
};

export default my;