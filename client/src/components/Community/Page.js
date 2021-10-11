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
        axios.get(`/community/${forumId}`)
        .then(res =>{
            console.log(res.data.data)
            test.current=res.data.data.allForum;
            if(test.current.count != data.count){
                setData(test.current)
                console(test)
            }
        })
        .catch(err =>console.log(err))
        
    },[data])

    const onPost = () =>{
        axios.post(`/`,{

        })
    }


    return (
        <>
        <div>
            <button onClick={onConsole}>콘솔</button>
            <input name="title" value={title} onChange={onChange} placeholder="제목" />
            <input name="content" value={content} onChange={onChange} placeholder="내용" />
            <button onClick={onPost}>글쓰기</button>
        </div>

        <div>게시글 목록</div> 
        </>


    );
};

export default Page;