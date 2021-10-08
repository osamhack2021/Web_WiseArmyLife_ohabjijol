import React from 'react';
import "./ExeResult.css";

const ExeResult = () => {

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

export default ExeResult;

// 여긴 용진

/**
 * F12누르면 콘솔창뜨거든  여기서 >> 클릭 aplication 클릭  ssestionStrage 클릭 key 를  isExecutive : true 이렇게하고 새로고침하면 간부페이지가 뜸
 * 다시 용사페이지 보고싶으면 isExecutive : false 하거나 완전 지우거나 
 *  간부 123 확인했지 
 * 여기서 간부 1 은 내가 만드는거야
 * 너는 간부2랑 간부 3 다지인해주면돼 okay?
 * 즉 용사 2 용사 3 간부2 간부3은 너가 디자인해줘 photopea.com 여기 psd 파일올리고 
 * Execurrent ExeResult
 * Current Result 너가 하는거야 ㅇㅋ?
 * 변수는 지금없으니까 const list [{
 * }]
 * 
 * 뭐이런식으로 해서 넣어서해봐
 * 캘린더 처럼
 * ㅇㅋ??
 * ㅇㅋ 변수 넣어보라는게 그 값뜨는거 내가 설정해서 잘나오는지 확인해보라 이거지 맞아 오켑 이해안되는거
 * ?ㄴㄴ 이해완료 캘린더 함수넣고 조작하는건 내가 하다가 모르는거 물어볼게
 * 어떤 부분 조작 필요해 어느정도는 검색해보면 나오니까 해보고 안되는거 물어봄
 * 오키 나도 낼 캘린더 영상좀 봐놀게 너가 일단 4페이지 디자인하는거
 * 생ㅇ각보다 오래걸리니까 그거해줘  ㅇㅇcurrent result 그냥이랑 exe 까지 해서 4개 중간부분 디자인 ㅇㅇ
 * ~~~~~~~~~~~~~~~~~~~~
 */