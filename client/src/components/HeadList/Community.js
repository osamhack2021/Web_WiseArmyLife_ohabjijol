import React,{useEffect} from 'react';
import axios from 'axios';

const Community = () => {
    useEffect(() => {
        axios.get('/Community')
        .then(res => console.log(res))
        .catch()
    },[])
   
  

    return (
        <div>
            커뮤니티
        </div>
    );
};

export default Community;