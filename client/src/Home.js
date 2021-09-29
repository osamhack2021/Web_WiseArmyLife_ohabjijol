import React, {useState} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./Home.css";
import {Col, Row, Container} from 'react-bootstrap';

function Home() {
  
  const headrStyle = {
    fontSize: "32px",
   textAlign: "center",
   borderBottom: "3px solid black",
   paddingBottom: "20px"

  }
  return (
    <React.Fragment>  
      {/* 전체를 묶는 div없도록! Fragment 이용 /
          header부분 __________________________inline으로 css이용하기! */}

 
    <div className="Header" style={headrStyle}>
     <h1>슬기로운 병영생활</h1>
       </div>
      
      {/* nav부분 : Conainer 이용해서 가로정렬!! blank이용해서 가운데 빈 공간 분리. */}
      <Container fluid>
        <Row>
        <Col className="Nav" >
              <Link to="/about">홈</Link>
              </Col>

        <Col className="Nav" >
              <Link to="/about">병기본평가</Link>
              </Col>

        <Col className="Nav" >
              <Link to="/about">커뮤니티</Link>
              </Col>

        <Col className="Nav" >
              <Link to="/about">마이페이지</Link>
              </Col>

         <Col className="blank">
              </Col>
             
             
        <Col className="Nav" >
              <Link to="/about">로그인</Link>
              </Col>

        <Col className="Nav" >
              <Link to="/about">회원가입</Link>
              </Col>

       
        </Row>
       </Container>

       <div className="Content">

       </div>


       <div className="Footer">
       <Container fluid>
        <Row>
        <Col className="Nav" >
              <Link to="/about">슬기로운 병영생활</Link>
              </Col>

        <Col className="Nav" >
              <Link to="/about">대표이메일 selgiarmy@naver.com</Link>
              </Col>

        <Col className="Nav" >
              <Link to="/about">이용약관</Link>
              </Col>

        <Col className="Nav" >
              <Link to="/about">개인정보처리방침</Link>
              </Col>

       
        </Row>
       </Container>


       </div>

       








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