import React from 'react';
import "./FreePost.css";
const FreePost = () => {

  


    return (
        <>
              <h2 className = "FPhTwo">자유게시판 +</h2>

              <div className="FPcontent">
               <h3 className="FPhThree">아아 심심해애 머 없낭</h3>
               <div> 아싸 내일 워라벨이다~~
                    
                   <br></br> 오늘 풋살 할사람 손?
                   <br></br> 에이~
               </div>
               
              </div>

              <div className ="FPpostChange">
                  <button className="FPbuttonOne">수정</button>
                  <button  className="FPbuttonOne">삭제</button>
              </div>

               <div className="FPmoveNext">
                   <div>다음글</div>
                   <div>우리 훈련일정 아는사람??</div> 
               </div>



               <div className="FPmovePrevious">
                   <div>이전글</div>
                   <div>나는 가끔 눈물을 흘 ㄹ ㅣㄴ ㄷ ㅏ...</div> 
               </div>

               <div className="FPSelectBox">

               <button className="FPbuttonTwo">글 목록 </button>

               </div>


        </>
    );
};

export default FreePost;