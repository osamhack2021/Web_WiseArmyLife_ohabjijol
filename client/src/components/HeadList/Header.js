import React, {useState,Component,useEffect} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from './Login';
import DetailHome from "./DetailHome";
import Community from './Community';
import Assess from "./Assess";
import './Header.css';
import My from "./My";
import AuthRoute from "../../Custom/AuthRoute";
import { signIn } from './../../Custom/Auth';
import LogoutButton from "./LogoutButton";
import LoginForm from "./LoginForm";
import PublicRoute from "../../Custom/PublicRoute";
import { setCookie,getCookie } from "../../Custom/cook";
import { isLogin } from "../../Custom/isLogin";

const Header = () => {

    const [user,setUser] = useState(null);
    let authenticated = user !=null;

    

    const login = ({ user_id, user_pw }) => {
        setCookie('login',true)
        return setUser(signIn({ user_id, user_pw }))
    };
    const logout = () => {
        setCookie('login',false)
        return setUser(null);
    }

    const headrStyle = {
        fontSize: "32px",
        textAlign: "center",
        paddingBottom: "20px"
      };
    
    
    
    return (
        <React.Fragment>

            <div className="Header" style={headrStyle}>
                <h1>슬기로운 병영생활</h1>
            </div>
            <Router>
                <div className="container">
                    <Link to="/">
                        <div>홈</div>
                    </Link>
                    <Link to="/assess">
                        <div>병기본평가</div>
                    </Link>
                    <Link to="/community">
                        <div>커뮤니티</div>
                    </Link>
                    <Link to="/my">
                        <div>마이페이지</div>
                    </Link>
                    {authenticated ? 
                    (
                        <LogoutButton auth={authenticated} logout={logout} />
                    ) : 
                    (<Link to="/login">
                        <button>Login</button>
                    </Link>)}
                    <Link to="/auth">
                        <div>회원가입</div>
                    </Link>
                </div>
                
                <Switch>
                    <PublicRoute exact path="/" restricted={false} auth={authenticated} component={DetailHome} />
                    <Route path="/login" render={(props) => (
                        <LoginForm
                            authenticated={authenticated}
                            login={login}
                            {...props}
                        />
                        )}
                    />
                    <PublicRoute path="/community" restricted={false} auth={authenticated}  component={Community} />
                    <PublicRoute path="/assess" restricted={false} auth={authenticated} component={Assess} />
                    <AuthRoute path="/my" authenticated={authenticated} render={ () => <My />} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default Header;