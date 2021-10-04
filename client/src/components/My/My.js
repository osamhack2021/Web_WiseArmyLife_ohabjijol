import React,{useState, useEffect} from 'react';
import axios from 'axios';

const My = () => {
    const [data,setData] = useState(null);

    useEffect(() => {
        axios.get('/profile')
        .then(res => {
            console.log(res.data)
        }
        )
        .catch()
    },[])

    return (
        <div>
            My
        </div>
    );
};

export default My;