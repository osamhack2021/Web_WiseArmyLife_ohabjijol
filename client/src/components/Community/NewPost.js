import React from 'react';
import "./NewPost.css";

const NewPost = () => {

    return (
        <>
        <h2 className="NPhTwo"> 공지사항 +</h2>
 
        <div className="NPcontent">
          <div className="NPcontentTop">
            <h3>제목 : </h3>
            <input className = "NPinputOne" type="text" name="title" placeholder="제목을 입력하십시오."/>
       </div>
 
       <div id="mainContent">
            <input className = "NPinputTwo" type="text" name="Write" placeholder="내용을 입력하십시오."/>
                    </div>
 
                    <button className="NPbuttonOne">등록</button>
        </div>
 
 <div className="NPbuttonList">
 <button className="NPbuttonTwo">{"<"}</button>  
             <button className="NPbuttonTwo">1</button>  
             <button className="NPbuttonTwo">2</button>  
             <button className="NPbuttonTwo"> 3</button>  
             <button className="NPbuttonTwo">4</button>  
             <button className="NPbuttonTwo">5</button>  
             <button className="NPbuttonTwo"> {">"}</button>  
 </div>
 
        </>
    );
};

export default NewPost;