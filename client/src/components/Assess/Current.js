import React from 'react';
import "./Current.css";

const Current = () => {

    const hTwoStyle = {
        padding:"20px",
        margin:"20px",
    }

   


    return (
        <>
        <div className="Ycontent">

      <h2 style={hTwoStyle}>신청인원확인 +</h2>


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