import React from 'react';
import { isLogin } from '../../Custom/isLogin';
const Button = () => {
    if (isLogin()){
        return (
            <button>로그아웃</button>
        );        
    }else{
        return(
            <button>로그인</button>
        )
    }
};

export default Button;