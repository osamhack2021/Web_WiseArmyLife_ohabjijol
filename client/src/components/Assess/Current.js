import React,{useState} from 'react';
import "./Current.css";


const defalutDate = [
    {
        target : "사격",
        date: "2021.10.08",
        time: "18:00~19:00",
        expire : "확인중"
    }
]

const Current = () => {

    // useEffect쓰기

    const [data,setData] = useState([defalutDate])

    const hTwoStyle = {
        padding:"20px",
        margin:"20px",
    }

    return (
        <>
        <div className="Ycontent">

        <h2 style={hTwoStyle}>신청결과확인 +</h2>
        <input placeholder="2021-10"/>

      <div className="Yresult">
          <span>2021.10.08</span>
          <span>18:00~19:00</span>
          <span>확인중</span>
      </div>

      <div className="Yresult">
          <span>2021.10.07</span>
          <span>13:00~15:00</span>
          <span>승인</span>
      </div>

      <div className="Yresult">
          <span>2021.10.09</span>
          <span>13:00~14:00</span>
          <span>미승인</span>
      </div>






      </div>
      </>
    );
};

export default Current;