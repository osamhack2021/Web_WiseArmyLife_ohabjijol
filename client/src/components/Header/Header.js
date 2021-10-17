import React, {useState ,useEffect,useRef} from "react";
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

import '../../Custom/gs.css'
import { useDetectOutsideClick } from '../../Custom/useDetectOutsideClick';
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */
const link = (id)=>{
    document.location.href = `/community/${id}`
}

function Ta() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const [data,setData] = useState({
        'count':100, // 100이면 오류
        'rows':[]
    });
    const {count,rows} = data;
    const test = useRef(0);
    useEffect(() => {
        axios.get('/Community')
        .then(res =>{
            test.current=res.data.data.allForum;
            
            if(test.current.count != data.count){
                setData(test.current)
            }
        })
        
        }
    ,[data])

    const onClick = () => {
        setIsActive(!isActive)
    };

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>커뮤니티</span>
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
                {rows.map(res=>{
                    return(
                        <li>
                            <Link onClick={()=>link(res.id)} to={`/community/${res.id}`}>{res.forumName}</Link>
                        </li>
                    )
                })
                }
                {(sessionStorage.getItem('isExecutive') === 'true') ?
                <li>
                    <Link  to={`/community`}>게시판 추가/삭제</Link>
                </li>:null

                }

          </ul>
        </nav>
      </div>
    </div>
  );
}

function Ta2() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const onClick = () => {
        setIsActive(!isActive)
    };

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>마음의 편지</span>
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
                <li>
                    <Link onClick={()=>link(1)} to={`/community/1`}>중대 마음의 편지</Link>
                </li>
                <li>
                    <Link onClick={()=>link(2)} to={`/community/2`}>대대 마음의 편지</Link>
                </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}


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

                        <Ta />

                        <Ta2 />
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
                        <PublicRoute path="/community/:forumId" restricted={false} auth={isLogin}   render={ (props) => <Forum id={props.match.params.id}/> } /> {/*동일 */}
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