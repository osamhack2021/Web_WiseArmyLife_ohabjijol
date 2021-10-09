import React from 'react';

const Error = () => {

    const hTwoStyle = {
        fontSize: "40px",
        color: "#000000",
        fontFamily: "Nanum Square EB", 
        textAlign:"center",
    }

    const explainStyle = {
        fontSize:" 30px",
        color: "#000000",
        fontFamily: "Nanum Square B",
        textAlign:"center",
    }





    return (
        <>

     



        <h2 style={hTwoStyle}>요청하신 페이지를 찾을 수 없습니다.</h2>

        <div style = {explainStyle}> 원하시는 결과를 찾을 수 없습니다.
            <br></br> 찾으시려는 페이지의 주소가 잘못 입력되었거나,
            <br></br> 변경 또는 삭제되어 페이지를 찾을 수 없습니다.
        </div>



        
        </>





    );
};
export default Error;