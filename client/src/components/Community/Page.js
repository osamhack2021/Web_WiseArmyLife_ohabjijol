import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Post from './Post';
import Community from './Community';
import './Page.css'

const Page = ({match}) => {

    const forumId = match.url[11]
    const [data,setData] = useState({
        maxPage:999,
        post_10:{
            count:0,
            rows:[]
        }
    });
    const [post,setPost] =useState(false)
    const [inputs,setInputs] =useState({
        title:'',
        content:''
    })
    const {title,content} = inputs;
    const {rows} = data.post_10;
    const onChange = (e)=>{
        const {name,value} = e.target

        setInputs({
            ...inputs,
            [name]:value
        })
    }

    const onConsole = ()=>{
        console.log(data.post_10.rows)
    }

    const test = useRef(null);
    useEffect(() => {
        axios.get(`/community/${forumId}/1`)
        .then(res =>{
            console.log(res.data.data)
            test.current = res.data.data
            if(test.current.maxPage !== data.maxPage){
                setData(test.current)
            }
        })
        .catch(err =>console.log(err))
    },[data])

    const onPost = () =>{
        const post ={
            title:title,
            content:content
        }
        console.log(post)
        axios.post(`/community/${forumId}/post`,post)
        .then(res=>{
            console.log(res.data)
        })
    }
    const onRemove = (id)=>{
        axios.delete(`/community/${forumId}/v/${id}`)
        .then(res=>{
            console.log(res.data);
        })
    }
    const gogoPost = ()=>{
        setPost(true);
    }
    const back = ()=>{
        setPost(false)
    }

    let index =0;

    return (
        <div>
            
            <button onClick={onConsole}>콘솔</button>
            {post===false ? 

            <div>
                {data.maxPage !==0 ?
                            <div className="pageBox">
                                <hr className='pageHr'/>
                                <div>
                                    <span className='pageHader'>No.1</span>
                                    <span className='pageHader1'>제목</span>
                                    <span className='pageHader2'>날짜</span>
                                    <span className='pageHader3'>작성자</span>
                                </div>
                                <div  className='pageBoard'>
                                    <div>
                                        <hr className='pageBoardHr' />
                                        <div>
                                        {
                                            data.post_10.rows.map(res=>{
                                                index += parseInt(1); 
                                                return(
                                                    <div className='postpost'>
                                                        <span className='postIndex'>
                                                            <span>{index} </span>
                                                        </span>
                                                        <span className='postTitle'>
                                                            <span>{res.title} </span>
                                                        </span>
                                                        <span className='postCreateAt'>
                                                            <span>{res.createdAt} </span>
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                    
                :<div>없음</div>}
            </div>
            

            :


            <div>
                <div onClick={back}>뒤로가기</div>
                <Post />
            </div>}
        </div>

    );
};

export default Page;