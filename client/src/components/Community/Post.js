import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from 'react';
import  axios  from 'axios';
import { useState } from 'react';
import './post.css'
import ReactHtmlParser from 'react-html-parser'
<<<<<<< HEAD

=======
import './newpost.css'
>>>>>>> eb1f3103a19e71b28cc6d72d33d6351356e7ddbd
const Post = (props) => {

    const {match,history} = props
    const [isPoster,setIsPoster] = useState(false)
    const {forumId,postId} = match.params    
    const [commentList,setCommetList] = useState([])
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
            
            setCommetList(res.data.data.currentPost.Comments)
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
    
    const onCommit = ()=>{
        const data = {
            "comment":comment
        }
        console.log('보내는내용')
        console.log(data)
        axios.post(`/community/${forumId}/post/v/${postId}/comment`,data)
        .then(res=>{
            console.log(res.data)
        })
    }
    const onChange = (e)=>{
        const {name,value} = e.target;
        setComment(value)
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
                
                <button className='postDeleteBtn' onClick={onRemove}>삭제</button>
                </div>

                <div className="POmoveNext">
                    <div>이전글</div>
                    {data.currentPost.prevPostId !== -1 ?
                    <div><Link className='text-link' onClick={()=>document.location.href = `/community/${forumId}/v/${data.currentPost.prevPostId}`} to={`/community/${forumId}/v/${data.currentPost.prevPostId}`}>{data.currentPost.prevPosttitle}</Link></div>
                        :null
                    }
                    
                </div>

                <div className="POmovePrevious">
                    <div>다음글</div>
                    {data.currentPost.nextPostId !== -1 ?
                    <div><Link className='text-link' onClick={()=>document.location.href = `/community/${forumId}/v/${data.currentPost.nextPostId}`} to={`/community/${forumId}/v/${data.currentPost.nextPostId}`}>{data.currentPost.nextPosttitle}</Link></div>
                        :null
                    }
                </div>
                <button className='BackToList' onClick={()=>document.location.href = `/community/${forumId}`}>글 목록</button>

                    
                    <div className='commentBox'>
                        <input className='commentInput' onChange={onChange} value={comment} placeholder='coment'/>
                        <button className='commentBtn' onClick={onCommit}>댓글작성</button>
                        <div className='commentList'>
                            {
                                commentList.map(res=>{
                                    return (
                                        <div>dd</div>
                                        )
                                    })
                                }
                        </div>
                    </div>

                                <button onClick={()=>console.log(data)}>콘솔</button>
        </>

        

            
        </div>
    );
};

export default Post;