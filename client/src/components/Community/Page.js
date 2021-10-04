import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';

const Page = ({match}) => {

    const forumId = match.url.substr(match.url.length-1,1)
    const [data,setData] = useState(null);
    const [inputs,setInputs] =useState({
        title:'',
        content:''
    })
    const {title,content} = inputs;

    const onChange = (e)=>{
        const {name,value} = e.target

        setInputs({
            [name]:value
        })
    }

    const onConsole = ()=>{
        console.log(test)
    }

    const test = useRef(null);
    useEffect(() => {
        console.log('여기는옴?')
        axios.get(`/community/${forumId}`)
        .then(res =>{
            console.log('바로')
            console.log(res.data.data)
            test.current=res.data.data.allForum;
            if(test.current.count != data.count){
                setData(test.current)
                console(test)
            }
        })
    },[data])

    const onPost = () =>{
        axios.post(`/`,{

        })
    }


    return (
        <div>
            <button onClick={onConsole}>콘솔</button>
            <input name="title" value={title} onChange={onChange} placeholder="제목" />
            <input name="content" value={content} onChange={onChange} placeholder="내용" />
            <button onClick={onPost}>글쓰기</button>
        </div>
    );
};

export default Page;