import React,{useEffect,useState,useRef, useReducer} from 'react';
import './ExeCurrent.css';
import axios from 'axios';

const ExeCurrent = (props) => {
    
    const {target,date} = props;
    const tableStyle = {
        borderBottom: "1px solid gray",
        width: "200px",
    }
    const [dataList,setDataList] = useState([])

    useEffect(()=>{
        axios.get(`/management/${target}/checkinfo?date=${date}`)
        .then(res=>{
            setDataList(res.data.data.userinfo);
        })
    })

    const onConsole = ()=>{
        console.log(dataList)
    }
    return (
        <>
        <div className = "Yentire">
            <button onClick={onConsole}>콘솔</button>
            <h2 className="YpeopleCheck">  {target}  </h2>
            <h2 >  {date}  </h2>


            <table className="YcurrentConfirm">
                <thead>
                    <tr>
                        <th style={tableStyle}>군번</th>  
                        <th style={tableStyle}>이름</th>
                    </tr>
                </thead>


                <tbody>
                    {dataList.map(data=>{
                        return (
                            <tr>
                                <td style={tableStyle}>{data.militaryNumber}</td>
                                <td style={tableStyle}>{data.name}</td>
                            </tr>
                        )
                    })}
                </tbody>            
                </table>


                </div>

                <div className="YselectBox">
                <button>{"<"}</button>  
             <button>1</button>  
             <button>2</button>  
             <button>3</button>  
             <button>4</button>  
             <button>5</button>  
             <button>{">"}</button>  
                </div>
{/* 일단 그냥 이렇게 해놀겡 */}

           
        
      

        </>
    );
};

export default ExeCurrent;

// 여기용진