import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Post from './Post';
import Community from './Community';
import './Page.css'
import Newpost from './Newpost';

const Page = ({match}) => {

    const forumId = match.url[11]
    const [data,setData] = useState({
        maxPage:999,
        post_10:{
            count:0,
            rows:[]
        }
    });
    const [post,setPost] =useState(1)
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
            console.log(res.data)
            test.current = res.data.data
            if(test.current.maxPage !== data.maxPage){
                setData(test.current)
            }
        })
        .catch(err =>console.log(err))
    },[data])

    const onRemove = (id)=>{
        axios.delete(`/community/${forumId}/v/${id}`)
        .then(res=>{
            console.log(res.data);
        })
    }

    let index =0;

    const onOne = (e)=>{
        e.preventDefault()
        setPost(1)
    }
    const onTwo = (e)=>{
        e.preventDefault()
        setPost(2)
    }
    const onThree = (e)=>{
        e.preventDefault()
        setPost(3)
    }
    return (
        <div>
            <h2>게시판 +</h2>
            <button onClick={onOne}>1</button>
            <button onClick={onTwo}>2</button>
            <button onClick={onThree}>3</button>
            
            {post===1 ?
            <div>
                <div>게시글리스트</div>
                <div onClick={onTwo}>글쓰기</div>
            </div>
            :null}
            
            {post===2 ?
            <Newpost forumId={forumId} onOne={onOne}/>
            :null}

            {post===3 ?
            <Post onOne={onOne}/>
            :null}
        </div>
    );
};

export default Page;