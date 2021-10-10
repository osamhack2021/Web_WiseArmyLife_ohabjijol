import React,{useEffect,useState} from 'react';
import './ExeCurrent.css';
import axios from 'axios';

const ExeCurrent = (props) => {

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
            setDataList(res.data.data)
        })
    }

    useEffect(()=>{
        const search = (props.location.search)
        const list = (search.split("&"))
        const target = (list[0].split("=")[1])
        const date = (list[1].split("=")[1])

        async function get() {
            const res = await axios.get(`/management/${target}/checkinfo?date=${date}`)
            await setGetDate(res.data.data.userinfo)
        }

        get()
        get()
    })

    const onConsole = ()=>{
        console.log(dataList)
    }
    return (
        <>
        <div className = "Yentire">
            <button onClick={onConsole}>콘솔</button>
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