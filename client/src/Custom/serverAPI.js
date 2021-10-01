import React, { Component } from 'react';
const axios = require('axios');


export async function testGet(url) {
  try {
    const response = await fetch('url'); // get방식  '/'로 요청보내기
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  } catch (error) {
    alert(error)
  }
}
export async function testPost(url,body) {
  axios.post(url,body)
  .then(response =>{
    console.log(response.data)
    return response.data;
  })
}