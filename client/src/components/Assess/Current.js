import React from 'react';
import "./Current.css";

const Current = () => {

    const hTwoStyle = {
        padding:"20px",
        margin:"20px",
        fontSize: "30px",
        fontFamily: "Nanum Square EB",
    }

   


    return (
        <>
        <div className="Ccontent">

      <h2 style={hTwoStyle}>신청결과확인 +</h2>


      <div className="Cresult">
          <span>2021.10.08</span>
          <span>18:00~19:00</span>
          <span>확인중</span>
      </div>

      <div className="Cresult">
          <span>2021.10.07</span>
          <span>13:00~15:00</span>
          <span>승인</span>
      </div>

      <div className="Cresult">
          <span>2021.10.09</span>
          <span>13:00~14:00</span>
          <span>미승인</span>
      </div>






      </div>
      </>
    );
};

export default Current;