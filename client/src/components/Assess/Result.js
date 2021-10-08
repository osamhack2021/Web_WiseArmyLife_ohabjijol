import React from 'react';
import "./Result.css";

const Result = () => {

    const hTwoStyle = {
        padding:"20px",
        margin:"20px",
    }

   const abcStyle={
       textAlign:"right",
   }


    return (
        <>
        <div className="content">

      <h2 style={hTwoStyle}> 평가결과 +</h2>


      <div className="result">
          <span>체력</span>
          <span>2021.10.14</span>
          <span>16:00~17:00</span>
          <span>A</span>
      </div>

      <div className="result">
      <span>사격</span>
          <span>2021.09.30</span>
          <span>18:00~19:00</span>
          <span>B</span>
      </div>

      <div className="result">
      <span>구급법</span>
          <span>2021.09.07</span>
          <span>15:00~16:00</span>
          <span>C</span>
      </div>


<span id="abc">※ A등급: 특급전사(조기진급) / B등급: 진급가능 / C등급 이하: 진급 누락</span>



      </div>
      </>
    );
};

export default Result;