import React,{useEffect,useState,useRef, useReducer} from 'react';
import './ExeCurrent.css';
import axios from 'axios';

const ExeCurrent = (props) => {
    
    const {onOff} = props;
    
    const tableStyle = {
        borderBottom: "1px solid gray",
        width: "200px",
        cursor:"pointer"
    }
    const [dataList,setDataList] = useState([])
    const [target,setTarget]=useState("")
    const [date,setDate] = useState("")


    useEffect(()=>{
        const newTarget = sessionStorage.getItem('target') 
        if(newTarget !== target){
            setTarget(newTarget)
        }

        const newDate = sessionStorage.getItem('date') 
        if(newDate !== date){
            setDate(newDate)
        }

        console.log(newTarget)

        axios.get(`/management/${newTarget}/checkinfo?date=${newDate}`)
        .then(res=>{
            if(res.data.success === true ){
                setDataList(res.data.data.userinfo);
                console.log(res.data.data.userinfo)
            }else{
                alert('Not Executive')
            }
            
        })
    },[date,target])


    const onScore = (militaryNumber)=>{
        if(target!="strength"){
        const score = prompt("점수입력 : ")
        const data =
            {       
                date : date,
                scoreAndId : [
                    {
                        "UserId":militaryNumber,
                        "score":score
                    }
                ]
            }
        console.log(data)
        axios.patch(`/management/${target}/scores`,data)
        .then(res=>{
            if(res.data.success === true){
                alert("등록성공")
            }else{
                alert("등록실패")
            }
        })
        
        axios.get(`/management/${target}/checkinfo?date=${date}`)
        .then(res=>{
            setDataList(res.data.data.userinfo);
            console.log(dataList)
        })}
        else{

            const pushUpscore = prompt("팔굽혀펴기 점수입력 : ")
            const sitUpscore = prompt("윗몸 점수입력 : ")
            const runningscore = prompt("뜀걸음 점수입력 : ")

        const data =
            {       
                date : date,
                scoreAndId : [
                    {
                        "UserId":militaryNumber,
                        "sitUpscore":sitUpscore,
                        "pushUpscore":pushUpscore,
                        "runningscore":runningscore

                    }
                ]
            }
        console.log(data)
        axios.patch(`/management/${target}/scores`,data)
        .then(res=>{
            if(res.data.success === true){
                alert("등록성공")
            }else{
                alert("등록실패")
            }
        })
        
        axios.get(`/management/${target}/checkinfo?date=${date}`)
        .then(res=>{
            setDataList(res.data.data.userinfo);
            console.log(dataList)
        })

        }


    }
    const onCon = ()=>{
        console.log(dataList)
    }
    return (
        <>
        <div className = "Yentire">
            <h2 className="YpeopleCheck">  {target}  </h2>
            <h2 >  {date}  </h2>
            


            <table className="YcurrentConfirm">
                <thead>
                    <tr>
                        <th style={tableStyle}>군번</th>  
                        <th style={tableStyle}>이름(점수)</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map(data=>{
                        if(target=="strength"){data.score = (data.pushUpscore+data.sitUpscore+data.runningscore)/3}
                        return (
                            <tr>
                                <td style={tableStyle}>{data.militaryNumber}</td>
                                <td onClick={()=> onScore(data.militaryNumber)} style={tableStyle}>{data.name} ({data.score})</td>
                                
                            </tr>
                        )
                    })}
                </tbody>            
                </table>
                <button onClick={onCon}>콘솔</button>
                <h2 className='backback' onClick={onOff}>뒤로가기</h2>
                </div>

        
           
        
      

        </>
    );
};

export default ExeCurrent;
