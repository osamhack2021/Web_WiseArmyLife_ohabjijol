import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Post from './Post';

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
        axios.delete(`/community/${forumId}/${id}`)
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
            <form>
                <input name="title" value={title} onChange={onChange} placeholder="제목" />
                <input name="content" value={content} onChange={onChange} placeholder="내용" />
                <button onClick={onPost}>글쓰기</button>    
            </form>
            {post===false ? <div>
                {data.maxPage !==0 ?
                    rows.map(res=>{
                        return (
                            <div>
                                <Router>
                                    <div onClick={gogoPost}>gggg</div>
                                </Router>
                                <button onClick={()=> onRemove(res.id)}>X</button>
                            </div>
                        )
                    })
                :<div>없음</div>}
            </div>:
            <div>
                <div onClick={back}>뒤로가기</div>
                <Post />
            </div>}
        </div>

    );
};

export default Page;