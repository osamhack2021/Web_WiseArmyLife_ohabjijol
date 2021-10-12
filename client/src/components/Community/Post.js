import React from 'react';
import styles from "./Post.module.css";
const Post = () => {

  


    return (
        <>
              <h2 className = {styles.PhTwo}>공지사항 +</h2>

              <div className={styles.content}>
               <h3 className={styles.PhThree}>군장병 코로나 방역수칙 안내</h3>
               <div>코로나 19방역수칙에 대해 안내합니다.
                   <br></br> 휴가 및 외박 후 자가 격리  
                   <br></br> - 부대 복귀 하루 전 PCR검사 실시
                   <br></br> - 부대 복귀 후 2주간 자가격리 필수
               </div>
               
              </div>

               <div className={styles.moveNext}>
                   <div>다음글</div>
                   <div>군장병 코로나 방역수칙 안내</div> 
               </div>



               <div className={styles.movePrevious}>
                   <div>이전글</div>
                   <div>군장병 코로나 방역수칙 안내</div> 
               </div>

               <div className={styles.SelectBox}>

               <button>글 목록 </button>

               </div>


        </>
    );
};

export default Post;