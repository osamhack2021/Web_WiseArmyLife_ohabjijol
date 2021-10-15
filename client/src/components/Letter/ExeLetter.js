import React from 'react';
import "./ExeLetter.css";

//LetterBoard 안에 있는 boards 가져와서 부르면 좋은데 ㅠ

const FreeBoard = () => {

    return (
        <>
        <h2 className="ELhTwo"> 마음의 편지 +</h2>
 
        <div className="ELcontent">
            <div className="ELletter">
            <table>
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    </tbody>
                </table>
                <br></br>
                <p>한길동 상병이 괴롭혀 군생활이 너무 힘듭니다..</p>
            </div>
                            {/* 마음의 편지 목록에서 눌렀을떄 그 내용을 호출해 오도록!! */}
      
 
       <div className="ELanswer">
            <input className = "ELinputOne" type="text" name="Write" placeholder=" 답변을 입력하십시오."/>
                    </div>

                    <div className="ELbutton">
                     <button className="ELbuttonOne">등록</button>
                    </div>

                    </div>
      
 
        </>
    );
};

export default FreeBoard;


// 간부가 마편 답장 써주는 페이지~~~