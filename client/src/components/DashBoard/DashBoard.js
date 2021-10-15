import React from 'react';
import './DashBoard.css';
import imgA from './Error.png';

const DashBoard = () => {

    const imgStyle = {
        marginTop:"200px"
    }



    const hTwoStyle = {
        fontSize: "40px",
        color: "#000000",
        fontFamily: "Nanum Square EB", 
      
    }

    const explainStyle = {
        fontSize:" 30px",
        color: "#000000",
        fontFamily: "Nanum Square B",
   
    }





    return (
        <>

     <div id="one">

       <img src = {imgA} alt='Error' style ={imgStyle} />

        <h2 style={hTwoStyle}>요청하신 페이지를 찾을 수 없습니다.</h2>



        <div style = {explainStyle}> 원하시는 결과를 찾을 수 없습니다.
            <br></br> 찾으시려는 페이지의 주소가 잘못 입력되었거나,
            <br></br> 변경 또는 삭제되어 페이지를 찾을 수 없습니다.
        </div>

        </div>

        
        </>





    );
};
export default DashBoard;