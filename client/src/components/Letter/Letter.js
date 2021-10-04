import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Letter = () => {

    useEffect(() => { //battalion or company
        axios.get('/letter/battalion')
        .then(res => {
            console.log(res.data)
        }
        )
        .catch()
    },[])

    return (
        <div>
            마편 of 마편
        </div>
    );
};

export default Letter;