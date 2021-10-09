import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';

const Letter = () => {

    const [data,setData] = useState(null)
    const test = useRef(null);

    useEffect(() => { //battalion or company
        axios.get('/letter/battalion')
        .then(res => {
            console.log(res.data)
            test.current = res.data.data;
            
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