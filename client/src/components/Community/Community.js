import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import MakeFourm from './MakeFourm';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Executive from './../Assess/Executive';
import My from './../My/My';

// match.params 사용
// 
const Community = ({match}) => {
    const [data,setData] = useState({
        'count':100,
        'rows':[]
    });
    const {count,rows} = data;
    const test = useRef(0);

    const [inputs,setInputs] = useState({
        boardName:''
    })

    const {boardName} = inputs;

    useEffect(() => {
        const {forumId,pageIndex,postId} =match.params;
        if(postId !==undefined){ // 특정게시판 특정 글
            console.log('1')
            axios.get(`/Community/${forumId}/v/${postId}`)
            .then(res => {
                console.log('hello');
                const {allForum} = res.data.data;
                console.log(allForum);
                setData(res.data.data);
            })
        } else if(pageIndex !==undefined){ // 특정게시판 특정페이지
            console.log('1')
            axios.get(`/Community/${forumId}/${pageIndex}`)
            .then(res => {
                console.log(res.data)
                setData(res.data.data);
            })
        } else if( forumId !==undefined){ // 특정게시판 첫페이지
            console.log('1')
            axios.get(`/Community/${forumId}/1`)
            .then(res =>{
                test.current=res.data.data.allForum;
                console.log(res.data.data)
                if(test.current.count != data.count){
                    setData(test.current)
                }
            })
        } else{ // 그냥 커뮤니티
            console.log('1')
            axios.get('/Community')
            .then(res =>{
                console.log(res.data.data)
                test.current=res.data.data.allForum;
                if(test.current.count != data.count){
                    setData(test.current)
                }
            })
        }
    },[data])

    const onClick = ()=>{
        axios.post('/Community/forumAdd',{
            'forumName':inputs.boardName
        })
        .then(res =>{
            console.log(res.data)
        })
    }

    const onChange = (e)=>{
        const {name,value} = e.target;

        setInputs({
            ...inputs,
            [name]:value
        })
    }

    return (
        <div>
            <input name="boardName" value={boardName} onChange={onChange} placeholder="게시판 이름" />
            <button onClick={onClick}>게시판등록</button>
            <Router>
                <MakeFourm data={rows} />
            </Router>
        </div>
    );
};

export default Community;