import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';


const Forum = () => {

    const [data,setData] = useState({
        'count':100,
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
        console.log(data);
    }
    return (
        <div>
            <input name="forumName" value={forumName} onChange={onChange} />
            <button onClick={onClick} >포럼만들기</button>
            <button onClick={onConsole}>콘솔</button>
            포럼화면
        </div>
    );
};

export default Forum;