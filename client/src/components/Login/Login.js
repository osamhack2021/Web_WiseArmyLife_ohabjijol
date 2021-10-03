import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
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
            console.log(inputId)
            console.log(inputPw)
            console.log(res.data)
            if(res.data.success === 'false'){
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================',res.data.msg)
                alert('로그인 실패')
            }else if(res.data.success === 'true') {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================','로그인 성공')
                sessionStorage.setItem('user_id', inputId)
            }
            // 작업 완료 되면 페이지 이동(새로고침)
//            document.location.href = '/'
        })
        .catch()

         
    }
 
    
     
    return(
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
}
 
export default Login;