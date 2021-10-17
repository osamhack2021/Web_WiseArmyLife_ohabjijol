import React,{useState, useEffect} from 'react';
import axios from 'axios';

const My = () => {
    const [data,setData] = useState({
        name:"",
        militaryNumber:"",
        position:""
    });

    useEffect(() => {
        axios.get('/auth/profile')
        .then(res => {
            console.log(res.data)
            if(res.data.success===true){
                console.log(res.data)
                const {name,militaryNumber,position} = res.data.data
                setData({
                    name:name,
                    militaryNumber:militaryNumber,
                    position:position
                }
            )}else{
                alert('받아오기 실패')
            }
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