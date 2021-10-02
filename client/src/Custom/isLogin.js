import {getCookie } from './cook';

export const isLogin = ()=>{
    if(getCookie('login')===true){
        return true;
    }
    else{
        return false;
    }
}