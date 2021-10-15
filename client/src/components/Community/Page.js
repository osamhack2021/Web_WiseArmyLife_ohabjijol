import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from "./Forum.module.css";
import './Page.css'
import './newpost.css'

const Page = ({match}) => {

    const forumId = match.params.forumId
    const [data,setData] = useState({
        maxPage:0,
        rows:[]
    });
    const index = useRef(1)
    const [newpost,setNewpost] =useState(false)
    const [inputs,setInputs] =useState({
        title:'',
        content:''
    })
    const {title,content} = inputs;

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
        axios.get(`/community/${forumId}/${index.current}`)
        .then(res =>{
            console.log(res.data)
            test.current = res.data.data
            if(test.current.maxPage !== data.maxPage){
                setData({
                    maxPage : res.data.data.maxPage,
                    rows:res.data.data.post_10.rows
                })
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

    const PageChange = (id)=>{
        axios.get(`/community/${forumId}/${index.current}`)
        .then(res =>{
            console.log(res.data)
            setData({
                maxPage : res.data.data.maxPage,
                rows:res.data.data.post_10.rows
            })
        })
        .catch(err =>console.log(err))
    }

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
    const bottomLine = {
        borderBottomWidth: "0px",
        paddingTop:"20px",
        paddingBottom:"20px",

    }

    const indexRendering = () => {
        const result = [];
        const length = data !==null ? data.maxPage : 1
        console.log(data)
        for (let i = 0; i < length; i++) {
          result.push(<button id={i} onClick={()=> PageChange(i+1)} className="pageButton">{i+1}</button>  );
        }
        return result;
      };

    const listRendering = ()=>{
        const result = [];

        data.rows.map(res=>{
            //2021 -10- 13T 11:11:28.000Z   3번2 
            let create ;
            if (res.createdAt.substr(8,2) == new Date().getDate()){
                let time = parseInt(res.createdAt.substr(11,2)) +parseInt(9)
                if(time >=24){
                    time -=24
                }
                create = time+res.createdAt.substr(13,6) 
            }else{
                create = res.createdAt.substr(2,8) + " "+ res.createdAt.substr(11,8) 
            }
            
            result.push(<tr>  <td className='Ntd' ><Link className='pageTitleLink' to={`/community/${forumId}/v/${res.id}`}>{res.title}</Link></td> 
            <td className='Ntd'>{create}</td>    </tr>)
            return null
        })
        return result;
     }
 
    return (
        <div>
            { newpost===false ?
                //여기는 글안쓸때 화면
            <div>
                <>
                    <div id="entire">
                        <h2 className={styles.FnoticeH}>공지사항 +</h2>
                        <div className='fContentBox'>
                            <div className='Fcontent'>
                                <div id="table">
                                    
                                    { <table className='Ntable'>
                                            <thead className='Nthead'>
                                                <th className='Nth'>    제목     </th>
                                                <th className='Nth'>    날짜     </th>
                                            </thead>
                                            <tbody className='pageBody'>
                                                { listRendering() }
                                                <tr> 
                                                <td style={bottomLine}></td>    </tr>
                                            </tbody>
                                        </table>
                                    }
                                </div>
                                <div>
                                    <button onClick={onConsole} className="pageButton">{"<"}</button>  
                                    { indexRendering() }
                                    <button className="pageButton">{">"}</button>  
                                    <button className='pageButton' onClick={()=>setNewpost(true)}>글쓰기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
            :
            <>
                <div className="NPcontent">
                    <div className="NPcontentTop">
                        <h3>제목 : </h3>
                        <input className = "NPinputOne"  name="title" value={title} onChange={onChange} placeholder="제목을 입력하십시오."/>
                    </div>
                    <div id="mainContent">
                        <input className = "NPinputTwo" name="content" value={content} onChange={onChange} placeholder="내용을 입력하십시오."/>
                    </div>
                    <button  className="NPbuttonOne" onClick={onPost}>등록</button>
                    <button onClick={()=>setNewpost(false)}>뒤로가기</button>
                </div>
            </>
            }
        </div>
    );
};

export default Page;