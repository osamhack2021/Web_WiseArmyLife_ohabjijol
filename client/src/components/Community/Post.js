import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from 'react';
import  axios  from 'axios';

const Post = (props) => {

    const {match,history} = props
    
    const {forumId,postId} = match.params    

    useEffect(()=>{
        axios.get(`/community/${forumId}/post/v/${postId}`)
        .then(res=>{
            console.log(res.data)
        })
    
    })
    const onRemove = ()=>{
        axios.delete(`/community/${forumId}/post/v/${postId}`)
        .then(res=>{
            console.log(res.data)
        })

        history.goBack()
    }
    const onEdit = ()=>{
        
    }
    return (
        <div>
            <button onClick={()=>console.log(forumId)}>콘솔</button>
            <button onClick={onRemove}>삭제하기</button>
            <button onClick={onEdit}>수정하기</button>
            <button onClick={()=>history.goBack()}>돌아가기</button>
        </div>
    );
};

export default Post;