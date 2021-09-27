import React, {useState} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

function Home() {
  return (
    <Router>
        <div>슬기로운 병영생활</div>
        <Link to="/">
            <div>홈</div>
        </Link>
        <Link to="/assess">
            <div>병기본평가</div>
        </Link>
        <Link to="/comunity">
            <div>커뮤니티</div>
        </Link>
        <Link to="/Api_test">
            <div>마이페이지</div>
        </Link>
        <Link to="/login">
            <div>로그인</div>
        </Link>
        <Link to="/auth">
            <div>휘원가입</div>
        </Link>
    </Router>

  );
}

export default Home;
