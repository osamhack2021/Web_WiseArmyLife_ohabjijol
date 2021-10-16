import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from 'react';
import  axios  from 'axios';
import { useState } from 'react';
import './post.css'
import ReactHtmlParser from 'react-html-parser'

const Post = (props) => {

    const {match,history} = props
    const [isPoster,setIsPoster] = useState(false)
    const {forumId,postId} = match.params    

    const [comment,setComment] = useState('')
    const [data,setData] = useState({
        currentPost : {
            ForumId: null,
            User: null,
            commentCount: null,
            content: null,
            createdAt: null,
            id: null,
            img: null,
            posterId: null,
            title: null,
            updatedAt: null
        },
        exPost :{
            title: null,
            url:null
        },
        nextPost :{
            title: null,
            url:null
        }

    })
    useEffect(()=>{
        axios.get(`/community/${forumId}/post/v/${postId}`)
        .then(res=>{
            setData(res.data.data)
            console.log(res.data.data)
            if(res.data.data.currentPost.User.name === sessionStorage.getItem('user_id')){
                console.log('21333333333333')
            }
        })
    
    },[])
    const onRemove = ()=>{
        axios.delete(`/community/${forumId}/post/v/${postId}`)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err =>console.log(err))

        history.goBack()
    }
    const onEdit = ()=>{
        
    }
    const onCommit = ()=>{
        const data = {
            "comment":comment
        }

        axios.post(`/community/${forumId}/${postId}/comment`,data)
        .then(res=>{
            console.log(res.data)
        })
    }
    return (


        <div>
            <>
                <h2 className = "POhTwo"> </h2>
                <div className="POcontent">
                    <hr  className='titleTopBar'/>
                    <h3 className="POhThree">{data.currentPost.title}</h3>
                    <hr className='titlebuttonBar' />
                    <div>{
                        ReactHtmlParser(data.currentPost.content)
                        }
                    </div>
                </div>
                
                <div className='editDelete'>
                <button className='postEditBtn' onClick={onEdit}>수정</button>
                <button className='postDeleteBtn' onClick={onRemove}>삭제</button>
                </div>

                <div className="POmoveNext">
                    <div>이전글</div>
                    {data.exPost !== null ?
                    <div><Link to={`/community/${forumId}/v/${parseInt(postId)-1}`}>{data.currentPost.title}</Link></div>
                        :null
                    }
                    
                </div>

                <div className="POmovePrevious">
                    <div>다음글</div>
                    {data.nextPost !== null ?
                    <div>{data.currentPost.title}</div>
                        :null
                    }
                    
                </div>
                <button className='BackToList' onClick={()=>history.goBack()}>글 목록</button>



               

               <div className="POSelectBox">


               </div>


        </>

        

            <button onClick={()=>console.log(data)}>콘솔</button>
            <button onClick={onCommit}>댓글작성</button>
            <input onChange={(data)=>setComment(data.value)} value={comment} placeholder='coment'/>
        </div>
    );
};

export default Post;