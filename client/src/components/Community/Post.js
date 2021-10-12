import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from 'react';
import  axios  from 'axios';

const Post = (props) => {

    const {match,history} = props
    
    const {forumId,postId} = match.params    

    useEffect(()=>{
        axios.get(`/community/${forumId}/v/${postId}`)
        .then(res=>{
            console.log(res.data)
        })
    
    })
    return (
        <div>
            <button onClick={()=>console.log(forumId)}>콘솔</button>
            <button onClick={()=>history.goBack()}>돌아가기</button>
        </div>
    );
};

export default Post;