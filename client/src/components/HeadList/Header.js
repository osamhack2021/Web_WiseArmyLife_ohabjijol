import React, {useState ,useEffect} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
 import Login from './Login';
import DetailHome from "./DetailHome";
import Community from './Community';
import Assess from "./Assess";
import './Header.css';
import My from "./My";
import AuthRoute from "../../Custom/AuthRoute";
import LogoutButton from "./LogoutButton";
import PublicRoute from "../../Custom/PublicRoute";
import App6 from "./App6";
import Letter from "./Letter";
import BoardPage from "../BoardPage/BoardPage";
import Auth from './Auth';
import DashBoard from "./DashBoard";


const Header = () => {

    
    const [isLogin, setIsLogin] = useState(false)
    
    // 경고 무시하세요
    useEffect(() => {
        if(sessionStorage.getItem('user_id') === null){
        // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
          console.log('isLogin ?? :: ', isLogin)
        } else {
        // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
        // 로그인 상태 변경
          setIsLogin(true)
          console.log('isLogin ?? :: ', isLogin)
        }
    })

    return (
        <React.Fragment>
            <div className="Header">
                <div className="test2">슬기로운 병영생활</div>
            </div>
            <Router>
                <div className="container">
                    <Link className="text-link" to="/">
                        <div>홈</div>
                    </Link>
                    <Link className="text-link" to="/assess">
                        <div>병기본평가</div>
                    </Link>
                    <Link className="text-link" to="/community">
                        <div>커뮤니티</div>
                    </Link>
                    <Link className="text-link" to="/letter">
                        <div>마음의편지</div>
                    </Link>
                    {isLogin ? 
                    (
                        <LogoutButton auth={isLogin} />
                    ) : 
                    (<Link className="text-link" to="/login">
                        <div>로그인</div>
                    </Link>)}
                    {isLogin ? 
                    (<Link className="text-link" to="/my">
                        <div>마이페이지</div>
                    </Link>) : 
                    (<Link className="text-link" to="/auth">
                        <div>회원가입</div>
                    </Link>)
                    }
                </div>
                
                <Switch>
                    <PublicRoute exact path="/" restricted={false} auth={isLogin} component={DetailHome} />
                    <Route path="/login" render={(props) => (
                        <Login />
                        )}
                    />
                    <PublicRoute path="/community" restricted={false} auth={isLogin}  component={Community} />
                    <PublicRoute path="/assess" restricted={false} auth={isLogin} component={Assess} />
                    <AuthRoute path="/my" auth={isLogin} render={ () => <My />} />
                    <AuthRoute path="/letter" auth={isLogin} render={ () => <Letter />} />
                    <PublicRoute path="/auth" restricted={true} auth={isLogin} component={Auth} />
                    <PublicRoute path="/dashboard" restricted={false} auth={isLogin} component={DashBoard} />
                    
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default Header;