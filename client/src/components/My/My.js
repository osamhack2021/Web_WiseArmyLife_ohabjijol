import React,{useState, useEffect} from 'react';
import axios from 'axios';

const My = () => {
    const [data,setData] = useState({
        name:"",
        militaryNumber:"",
        position:""
    });

    useEffect(() => {
        axios.get('/profile')
        .then(res => {
            console.log(res.data)
            const {name,militaryNumber,position} = res.data
            setData({
                name:name,
                militaryNumber:militaryNumber,
                position:position
            })
        })
    },[])

    return (
        <div>
            <div>
                군번 : {data.militaryNumber} 
            </div>
            <div>
                이름 : {data.name}
            </div>
            <div>
                직책 : {data.position}
            </div>
        </div>
    );
};

export default My;