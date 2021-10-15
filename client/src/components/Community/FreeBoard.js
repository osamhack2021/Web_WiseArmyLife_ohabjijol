import React from 'react';
import "./FreeBoard.css";

const FreeBoard = () => {

    return (
        <>
        <h2 className="FBhTwo"> 자유게시판 +</h2>
 
        <div className="FBcontent">
          <div className="FBcontentTop">
            <h3>제목 : </h3>
            <input className = "FBinputOne" type="text" name="title" placeholder="제목을 입력하십시오."/>
       </div>
 
       <div id="FBmainContent">
            <input className = "FBinputTwo" type="text" name="Write" placeholder="내용을 입력하십시오."/>
                    </div>

                    <div className="FBbutton">
                     <button className="FBbuttonOne">등록</button>
                    </div>
        </div>
 
        </>
    );
};

export default FreeBoard;