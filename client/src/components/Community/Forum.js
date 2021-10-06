import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';


const Forum = () => {

    const [data,setData] = useState({
        'count':100, // 100이면 오류
        'rows':[]
    });

    const {count,rows} = data;
    
    const [inputs,setInputs] = useState({
        forumName:''
    })
    
    const test = useRef(0);
    const {forumName} = inputs;

    useEffect(() => {
            axios.get('/Community')
            .then(res =>{
                console.log(res.data.data)
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
    const onConsole= ()=>{
        console.log(rows);
    }

    const goPage  = (id)=>{
        const defaultPageIndex=1
        document.location.href = `/community/${id}/${defaultPageIndex}`
    }
    const onRemove = (id)=>{
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
            <input name="forumName" value={forumName} onChange={onChange} />
            <button onClick={onClick} >포럼만들기</button>
            <button onClick={onConsole}>콘솔</button>
            <div>
                {rows.map(row =>{
                    return(
                        <div>
                            <span onClick={ ()=> goPage(row.id)}>{row.forumName}</span>
                            <button id={row.id} onClick={onRemove}> X </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Forum;