import React from 'react';
import "./NewPost.css";

const NewPost = () => {

    return (
        <>
        <h2> 공지사항 +</h2>
 
        <div className="content">
          <div className="contentTop">
            <h3>제목 : </h3>
            <input type="text" name="title" placeholder="제목을 입력하십시오."/>
       </div>
 
       <div id="mainContent">
            <input type="text" name="Write" placeholder="내용을 입력하십시오."/>
                    </div>
 
                    <button>등록</button>
        </div>
 
 <div className="buttonList">
 <button>{"<"}</button>  
             <button >1</button>  
             <button >2</button>  
             <button > 3</button>  
             <button >4</button>  
             <button>5</button>  
             <button>{">"}</button>  
 </div>
 
        </>
    );
};

export default NewPost;