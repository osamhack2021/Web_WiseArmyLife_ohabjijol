import React from 'react';
import "./Result.css";

const Result = () => {

    const tableStyle = {
        borderBottom: "1px solid gray",
        width: "200px",
    }

    const saveStyle = {
        marginBottom: "50px",
        borderRadius:"10px",
        backgroundColor:"#ffd265",
        width:"120px",
    }

    const buttonStyle = {
        padding:"5px",
        margin:"5px"
    }

    return (
        <>
        <div className = "entireTwo">
        <h2 className="resultRegister">  결과등록 +  </h2>
       
         <table className="resultTable">
             <thead>
                 <tr>
                     <th style={tableStyle}>군번</th>  
                     <th style={tableStyle}>이름</th>
                     <th style={tableStyle}>점수</th>
                     <th style={tableStyle}>등급</th>
                 </tr>
             </thead>
             <tbody>
                 <tr>
                     <td style={tableStyle}>20-12345678</td>
                     <td style={tableStyle}>홍길동</td>
                     <td style={tableStyle}>95</td>
                     <td style={tableStyle}>A</td>

                 </tr>
                 <tr>
                     <td style={tableStyle}>20-0124816</td>
                     <td style={tableStyle}>둘리</td>
                     <td style={tableStyle}>80</td>
                     <td style={tableStyle}>B</td>
                 </tr>
             </tbody>            
             </table>

             <button style={saveStyle}>저장</button>    
             {/* onclick 함수 추가 */}
             <br></br>

             </div>

             <div className="buttonGroup">
             <button style={buttonStyle}>{"<"}</button>  
             <button style={buttonStyle}>1</button>  
             <button style={buttonStyle}>2</button>  
             <button style={buttonStyle}>3</button>  
             <button style={buttonStyle}>4</button>  
             <button style={buttonStyle}>5</button>  
             <button style={buttonStyle}>{">"}</button>  

             </div>

</>
             

       

    );
};

export default Result;

//여기용진