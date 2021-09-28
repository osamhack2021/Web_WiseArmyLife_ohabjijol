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