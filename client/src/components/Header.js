import React, {useState,Component} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from './Login';
import DetailHome from "./DetailHome";
import Community from './Community';
import Assess from "./Assess";
import './Header.css';


const Header = () => {
    return (
        <div className="header">
            <h1 className="topHeader">슬기로운 병영생활</h1>
            <div>
                <ul className="topList">
                    <Router>
                        <li className="topListItem">
                            <Link to="/">
                                <div>홈</div>
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link to="/assess">
                                <div>병기본평가</div>
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link to="/community">
                                <div>커뮤니티</div>
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link to="/my">
                                <div>마이페이지</div>
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link to="/login">
                                <div>로그인</div>
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link to="/auth">
                                <div>회원가입</div>
                            </Link>
                        </li>

                        <Switch>
                            <Route exact path="/" component={DetailHome} />
                            <Route path="/login" component={Login} />
                            <Route path="/community" component={Community} />
                            <Route path="/assess" component={Assess} />
                        </Switch>
                    </Router>
                </ul>
            </div>
        </div>
    );
};

export default Header;