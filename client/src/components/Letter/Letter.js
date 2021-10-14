import React,{useEffect,useState,useRef, useReducer} from 'react';
import axios from 'axios';

/**
 *  마편 get('/company/:pageIndex')
    마편 작성 post('/letter/:forumId/post')
    마편 get('/letter/company/:pageIndex')
    마편 대대급
    get('/letter/battalion/:pageIndex')
    get('/company/:pageIndex')
    get('/company/company/:pageIndex')
    get('/letter/company/company/:pageIndex')
    대대급 읽기get('/letter/battalion/:pageIndex')
    중대급 읽기get('/letter/company/:pageIndex')
    중대급 글 하나 읽기
    get('/letter/company/:forumId/:postId)
    중대급 글 하나 읽기
    get('/letter/company/:postId)
 
 */

const Letter = () => {

    const [data,setData] = useState(null)
    const test = useRef(null);
    const [onWhere,setOnWhere] = useState('company')
    const [newpost,setNewpost] = useState(false)
    const [inputs,setInputs] = useState({
        title:"",
        content:""
    })
    const pageIndex = useRef(1)
    useEffect(() => { //battalion or company
        console.log(onWhere)
        axios.get(`/letter/${onWhere}/${pageIndex.current}`)
        .then(res => {
            console.log(res.data)
            test.current = res.data.data;
        }
        )
        .catch()
    },[onWhere])
    
    const onPost = ()=>{
        const data = {
            title:inputs.title,
            content:inputs.content
        }
        axios.post(`/letter/${onWhere}/post`,data)
        .then(res=>{
            console.log(res.data)
        })
        setNewpost(false);
    }

    return (
        <div>
            {newpost===false ? <div>
                <button onClick={()=>setOnWhere('company')}>중대</button>
                <button onClick={()=>setOnWhere('battalion')}>대대</button>
                <button onClick={()=>setNewpost(true)}>글쓰기</button>
            </div>
            :
            <div>
                <input placeholder='title' name="title" value={inputs.title} onChange={(e)=>setInputs({...inputs,title:e.value})}/>
                <input placeholder='content' name="content" value={inputs.content} onChange={(e)=>setInputs({...inputs,content:e.value})}/>
                <button onClick={onPost}>보내기</button>
                <button onClick={()=>setNewpost(false)}>뒤로가기</button>
            </div>
            }
        </div>
    );
};

export default Letter;