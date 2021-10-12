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
    const [newpost,setNewpost] =useState(false)
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
        setNewpost(false)
        window.location.href = `/community/${forumId}`;
    }

    return (
        <div>
            { newpost===false ?
                //여기는 글안쓸때 화면
            <div>
                <h2>게시판 +</h2>
                
                
                <div>
                    {data.post_10.rows.map(res=>{
                        return(
                            <div>
                                <Link to={`/community/${forumId}/v/${res.id}`}>{res.title}</Link>
                            </div>
                        )
                    })}
                </div>
                
                <div>
                    <button onClick={()=>setNewpost(true)}>글쓰기</button>
                </div>
                <Link to={`/community`}>포럼으로</Link>
            </div>
            :
                // 여기부터 글쓰기화면
            <div>
                <div>글을쓰자 !! </div>
                <input placeholder='title' name="title" value={title} onChange={onChange}/>
                <input placeholder='content' name="content" value={content} onChange={onChange}/>
                <button onClick={onPost}>작성완료</button>
                <button onClick={()=>setNewpost(false)}>뒤로가기</button>

            </div>
            }
            
        </div>
    );
};

export default Page;