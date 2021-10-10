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
        console.log(data)
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

    return (
        <div>
            
            <button onClick={onConsole}>콘솔</button>
            {post===false ? 

            <div>
                {data.maxPage !==0 ?
                    rows.map(res=>{
                        console.log(res)
                        return (
                            <div className="pageBox">
                                <hr className='pageHr'/>
                                <div>
                                    <span className='pageHader1'>제목</span>
                                    <span className='pageHader2'>날짜</span>
                                    <span className='pageHader3'>작성자</span>
                                </div>
                                <div onClick={gogoPost}> 글!! id값 : {res.id}</div>
                                <button onClick={()=> onRemove(res.id)}>X</button>
                            </div>
                        )
                    })
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