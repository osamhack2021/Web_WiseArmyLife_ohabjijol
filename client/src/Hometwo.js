import React, {useState} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./Home.css";


function Home() {
  
  const headrStyle = {
   fontSize: "32px",
   textAlign: "center",
   paddingBottom: "20px"
  }

  const smallStyle = {
    fontSize: "12px",
    textAlign:"center"
  }

  return (

    <React.Fragment>  

      {/* 전체를 묶는 div없도록! Fragment 이용 /
          header부분 __________________________inline으로 css이용하기! */}

 
    <div className="Header" style={headrStyle}>
     <h1>슬기로운 병영생활</h1>
       </div>


       <div className="container">
 <p> 홈 </p>
 <p> 병기본평가 </p>
 <p> 커뮤니티 </p>
 <p> 마이페이지 </p>
 <p> </p>
 <p> 로그인 </p>
 <p> 회원가입 </p>
 
    </div>

    {/* 여기까지가 상위 배너   // 링크는 나중에 추가! 일단 틀만.. */}

<div className="topBanner">
    <img src={ require('../public/img/wal.jpg') } alt ="상위 배너 사진"/>
    <button>circle</button>
    </div>

<div className="content">

  <h2>병기본평가+</h2>
  <div className="basicTest">
    <p>사격<br></br>
    <div style = {smallStyle}>
    사격 평가 일정 안내 및 신청
    </div>
    </p>

    <p>정신전력평가</p>

    <p>체력</p>

    <p>구급법 및 화생방</p>

    <p>각개전투</p>
    <p>주특기</p>
    </div>

    <h2>공지사항+</h2>
    <div className="notice">
   <p>군장병 코로나 방역수칙 안내</p>
  <p>자유시간 관련 공지</p>
  <p>휴가 및 외박 일정 안내</p>
  </div>

  <h2>커뮤니티+</h2>
<div className="community">
   <p>오늘의 급식</p>
  <p>마음의 편지</p>
  </div>


  </div>




<div className ="footerContainer">
  <p>슬기로운 병영생활</p>
  <div className="footerTwo">
  <p>대표이메일 seulgiarmy@naver.com</p>
  </div>
  <p>이용약관</p>
  <p>개인정보 처리방침</p>
  
  </div>
  
      

 
      {/* nav부분 : Conainer 이용해서 가로정렬!! blank이용해서 가운데 빈 공간 분리. */}
   





      </React.Fragment>
  );
}

export default Home;



/*
header  : 슬기로운 병영생활 사이트 이름을 표시 
nav     : 홈 병기본평가 커뮤니티 마이페이지 로그인 회원가입 등 상위 배너 (링크)
section : 메인화면. 배너~병기본평가+~공지사항+~커뮤니티+~
footer  : 대표이메일, 이용약관, 개인정보처리방침들 아랫부분.

import "./about" from About
<Route path="주소규칙" component={보여주고싶은 컴포넌트}>
<Link to="/about">소개</Link>
*/