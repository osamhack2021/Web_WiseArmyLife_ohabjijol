import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';


/**
 *  post('/community/:forumId/:postId/comment')
    댓글 수정, 삭제:put('/community/:forumId/:postId/:commentId')
    대댓글: post('/community/:forumId/:postId/:commentId')
    댓글 등록: content
 
 */

const Forum = () => {

    const [data,setData] = useState({
        'count':100, // 100이면 오류
        'rows':[]
    });
    const [isExecutive,setIsExecutive] = useState(false)

    const {count,rows} = data;
    
    const [inputs,setInputs] = useState({
        forumName:''
    })
    
    const {forumName} = inputs;
    
    const test = useRef(0);
    useEffect(() => {
        const Tf = sessionStorage.getItem('isExecutive')
        if(Tf === 'true'){
            setIsExecutive(true)
        }else{
            setIsExecutive(false)
        }

            axios.get('/Community')
            .then(res =>{
                test.current=res.data.data.allForum;
                
                if(test.current.count != data.count){
                    setData(test.current)
                }
            })
        }
    ,[data])
    const onClick = ()=>{
        axios.post('/Community/forumAdd',{
            'forumName':inputs.forumName
        })
        .then(res =>{
            console.log(res.data)
            if(res.data.success === true){
                alert('추가성공!')
                document.location.href = '/Community'
            }else{
                alert(res.data.data.message)
            }
        })
    }
    const onChange = (e)=>{
        const {name,value} = e.target;

        setInputs({
            ...inputs,
            [name]:value
        })
    }
    const onRemove = (id)=>{
        console.log(id)
        axios.delete(`/community/${id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.success === true){
                alert('삭제 성공')
            }else{
                alert('삭제실패')
            }
        })
    }

    
    return (
        <div>
            


            <h2>커뮤니티+ </h2>
            {isExecutive ?
            <div>
                <input name="forumName" value={forumName} onChange={onChange} />
                <button onClick={onClick} >포럼만들기</button>
            </div>
            :null}

            <div>
                {rows.map(row =>{
                    return(
                        <div>
                            <Link to={`/community/${row.id}`}>{row.forumName}</Link>
                            {isExecutive ?
                            <button id={row.id} onClick={ ()=> onRemove(row.id)}> X </button>
                            :null}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Forum;