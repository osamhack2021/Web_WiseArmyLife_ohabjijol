import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './My.css'
import {ProgressBar}  from 'react-bootstrap'

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
        <div className='myPageBoard'>
            <div className='myPageBox'>
                <div>
                    군번 : {data.militaryNumber} 
                </div>
            </div>
            <div className='myPageBox'>
                <div>
                    이름 : {data.name}
                </div>
            </div>
            <div className='myPageBox'>
                <div>
                
                군생활계산기 : <progress className='progressBar' value="55" max="100"></progress> 55%
                </div>
            </div>
            
            <div className='myPageBox'>
                <div>
                    직책 : {data.position}
                </div>
            </div>
            <div className='myPageBox'>
                <div>
                    비밀번호변경 : <input className='changePwInput'/> <button className='changePwBtn'>변경하기</button>
                </div>
            </div>
        </div>
    );
};

export default My;