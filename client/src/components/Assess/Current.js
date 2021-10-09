import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "./Current.css";


const defalutDate = [
    {
        target : "사격",
        date: "2021.10.08",
        time: "18:00~19:00",
        expire : "확인중"
    }
]

const Current = (props) => {

    const {target} = props;
    // useEffect쓰기

    const [data,setData] = useState([defalutDate])

    useEffect(()=>{
        axios.get(`/assessment/result`)
        .then(res=>{
            const dataList = res.data.data;
            console.log(dataList)
            setData(dataList);
            })
    })
    
    const hTwoStyle = {
        padding:"20px",
        margin:"20px",
    }


    return (
        <>
        <div className="Ycontent">

            <h2 style={hTwoStyle}>신청결과확인 +</h2>
            <input placeholder="2021-10"/>
            <button>확인하기</button>


            {data.map(res=>{
                return(
                    <div className="Yresult">
                        <span>{res.date}</span>
                        <span>{res.time}</span>
                        <span>{res.expire}</span>
                    </div>
                )
            })}
        </div>
      </>
    );
};

export default Current;