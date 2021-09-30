/*
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Login = () => {

    const test = true;

    const [login,setIogin] = useState(false);

    const [inputs,setInputs] = useState({
        user_id:'',
        user_pw:''
    })

    const {user_id,user_pw} = inputs;

    
    function onChange(e){

        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value,
        })
    }
    
    // e.target === <button onClick={submitClick}>로그인 </button>
    
    const submitLogin = async e => {
        e.preventDefault();
        if (test){
            alert('테스트 로그인 성공')
            localStorage.setItem('login_info','true')
            setInputs(true);

        }else{
            axios.post('/auth/login', {
            militaryNumber:user_id,
            password:user_pw
            }) 
            .then( response => {
                alert(`id:$(militaryNumber) pw:$(password))`)
                if(response.data.success){
                    alert('로그인 성공');
                    localStorage.setItem('login_info','true')
                    setInputs(true);
                }  
                else{
                    alert('로그인 실패');
                }
            })
        }
    }
    const submitlogout = () =>{
        localStorage.setItem('login_info','false')
        setInputs(false);
    }
    

    return (
        
        <form>
            <input name="user_id" value={user_id} onChange={onChange}/>
            <input name="user_pw" value={user_pw} onChange={onChange}/>
            <button onClick={submitLogin}>로그인</button>
        </form>
        
    );
};

export default Login;

*/
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
 
    const onClickLogin = () => {
        console.log('click login')
        console.log('ID : ', inputId)
        console.log('PW : ', inputPw)


        console.log('======================','로그인 성공')
                sessionStorage.setItem('user_id', inputId)
                document.location.href = '/'
        /*
        axios.post('/user_inform/onLogin', null, {
            params: {
            'user_id': inputId,
            'user_pw': inputPw
            }
        })
        .then(res => {
            console.log(res)
            console.log('res.data.userId :: ', res.data.userId)
            console.log('res.data.msg :: ', res.data.msg)
            if(res.data.userId === undefined){
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================',res.data.msg)
                alert('입력하신 id 가 일치하지 않습니다.')
            } else if(res.data.userId === null){
                // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.')
            } else if(res.data.userId === inputId) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================','로그인 성공')
                sessionStorage.setItem('user_id', inputId)
            }
            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/'
        })
        .catch()
        */
    }
 
     useEffect(() => {
         axios.get('/user_inform/login')
         .then(res => console.log(res))
         .catch()
     },[])

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