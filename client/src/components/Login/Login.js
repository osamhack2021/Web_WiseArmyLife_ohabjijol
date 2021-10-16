import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    const onClickLogin = (e) => {
        //sessionStorage.setItem('user_id', inputId)
        //document.location.href = '/'
        
        
        axios.post('/auth/login',  {
            'militaryNumber': inputId,
            'password': inputPw
        })
        .then(res => {
            console.log(res.data)
            if(res.data.success === false){
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                alert('로그인 실패')
            }else if(res.data.success === true) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                sessionStorage.setItem('user_id', inputId)
                console.log(res.data.data)

                const exe = res.data.data.isExecutive
                //const exe = false
                if (exe === 0 ){
                    sessionStorage.setItem('isExecutive', false)
                }else{
                    sessionStorage.setItem('isExecutive', true)
                }

                document.location.href = '/'
            }
            // 작업 완료 되면 페이지 이동(새로고침)
//            document.location.href = '/'
        })
        .catch()

         
    }
 
    
     
    return(
        <div className="loginMain">
            <h2 className="loginText">로그인 +</h2>
            <form className="loginForm">
                <div>
                    <span className="textId">아이디</span>
                    <input className="inputId" type='text' name='input_id' value={inputId} onChange={handleInputId} />
                </div>
                <div>
                    <span className="textPw">비밀번호</span>
                    <input className="inputPw" type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
                </div>
                <div className="buttonList">
                    <span className="loginButton" type='button' onClick={onClickLogin}>로그인</span>
                    <Link className="loginButton" to="/auth">회원가입</Link>
                </div>
            </form>
        </div>
    )
}
 
export default Login;