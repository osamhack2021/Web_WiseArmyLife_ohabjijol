import React,{useState} from 'react';
import './ExeCurrent.css';
import axios from 'axios';

const ExeCurrent = () => {

    const tableStyle = {
        borderBottom: "1px solid gray",
        width: "200px",
    }
    const [getdate,setGetDate] = useState("")
    const [dataList,setDataList] = useState([])

    const getData = (e)=>{
        e.preventDefault()
        axios.get(`/management/shooting/checkinfo?date=${getdate}`)
        .then(res=>{
            console.log(res.data.data)
            console()
            setDataList(res.data.data)
        })
    }
    return (
        <>
        <div className = "Yentire">
            <h2 className="YpeopleCheck">  인원확인 +  </h2>
            <input placeholder="YYYY-MM-DD" value={getdate} onChange={(e)=>{setGetDate(e.target.value)}}/>
            <button onClick={getData}>확인하기</button>


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
                                <td style={tableStyle}>20-12345678</td>
                                <td style={tableStyle}>홍길동</td>
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