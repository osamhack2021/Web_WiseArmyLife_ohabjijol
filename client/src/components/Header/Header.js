import React, {useState ,useEffect} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
 import Login from '../Login/Login';
import DetailHome from "../Home/DetailHome";
import Assess from "../Assess/Assess";
import './Header.css';
import My from "../My/My";
import AuthRoute from "../../Custom/AuthRoute";
import PublicRoute from "../../Custom/PublicRoute";
import Letter from "../Letter/Letter";
import Auth from '../Login/Auth';
import DashBoard from "../DashBoard";
import axios from "axios";
import Post from './../Community/Post';
import Page from './../Community/Page';
import Forum from './../Community/Forum';


const Header = () => {

    
    const [isLogin, setIsLogin] = useState(false)
    
    const onLogout = () => {
        // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
        
        axios.get('/auth/logout')
            .then(res => {
                if(res.data.success===true){
                    console.log('로그아웃')
                }else{
                    console.log('로그아웃 실패');
                }
            })
        setIsLogin(false);
        sessionStorage.removeItem('user_id')
        sessionStorage.removeItem('isExecutive')
        document.location.href = '/'
        
      }
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
            <div className="header">
                <div className="titleBar">
                    <div className="titleName">슬기로운 병영생활</div>
                </div>
                <Router>
                    <div className="mainMenu">
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
                            <div className="text-link" onClick={onLogout}>로그아웃</div>
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
                        <Route exact path="/Community/:forumId/:page?" component={Page} />
                        <Route exact path="/Community" component={Forum} />

                        <PublicRoute path="/community/:forumId/v/:postId" restricted={false} auth={isLogin}  component={Post} /> {/*이건 홈페이지에서 인덱스 치고 들어갈때를 위한 라우터 */}
                        <PublicRoute path="/community/:forumId" restricted={false} auth={isLogin}  component={Forum} /> {/*동일 */}
                        <PublicRoute path="/community/:forumId/:pageIndex" restricted={false} auth={isLogin}  component={Page} /> {/*동일 */}
                        <PublicRoute path="/assess" restricted={false} auth={isLogin} component={Assess} />
                        <AuthRoute path="/my" auth={isLogin} render={ () => <My />} />
                        <AuthRoute path="/letter" auth={isLogin} render={ () => <Letter />} />
                        <PublicRoute path="/auth" restricted={true} auth={isLogin} component={Auth} />
                        <PublicRoute path="/" restricted={false} auth={isLogin} component={DashBoard} />
                        
                    </Switch>
                </Router>
            </div>
        </React.Fragment>
    );
};

export default Header;