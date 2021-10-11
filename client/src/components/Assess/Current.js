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

        async function getEvents() {
            const res1 = await axios.get(`/assessment/shooting/result`)
            const res2 = await axios.get(`/assessment/cBR/result`)
            const res3 = await axios.get(`/assessment/firstAid/result`)
            const res4 = await axios.get(`/assessment/individualBattle/result`)
            const res5 = await axios.get(`/assessment/speciality/result`)
            const res6 = await axios.get(`/assessment/strength/result`)

            if(res1.data.data ===null){
                res1.data.data = []
            }
            if(res2.data.data ===null){
                res2.data.data = []
            }
            if(res3.data.data ===null){
                res3.data.data = []
            }
            if(res4.data.data ===null){
                res4.data.data = []
            }
            if(res5.data.data ===null){
                res5.data.data = []
            }
            if(res6.data.data ===null){
                res6.data.data = []
            }

            
            const getData = [
                ...res1.data.data,
                ...res2.data.data,
                ...res3.data.data,
                ...res4.data.data,
                ...res5.data.data,
                ...res6.data.data
            ];
            console.log(getData)
            setData(getData)
        }
        getEvents()
    },[target])
    
    const hTwoStyle = {
        padding:"20px",
        margin:"20px",
    }


    return (
        <>
        <div className="Ycontent">

            <h2 style={hTwoStyle}>신청결과확인 +</h2>

            {data.map(res=>{
                return(
                    <div className="Yresult">
                        <span>{res.date}</span>
                        <span>{res.time}{res.score !== -1 ? ( res.score) : null}</span>
                    </div>
                )
            })}
        </div>
      </>
    );
};

export default Current;