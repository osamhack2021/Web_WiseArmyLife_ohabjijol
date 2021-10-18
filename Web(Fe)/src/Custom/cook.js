import {Cookies} from 'react-cookie';
import React from 'react';

const cookies = new Cookies();

export const setCookie = (key,value,option) =>{
    return cookies.set(key,value,{...option})
}

export const getCookie = (key)=>{
    return cookies.get(key)
}