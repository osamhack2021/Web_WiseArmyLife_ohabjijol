import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from "./Forum.module.css";
import './Page.css'
import './newpost.css'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Page = ({match}) => {

    const forumId = match.params.forumId
    const [data,setData] = useState({
        maxPage:0,
        rows:[],
        forumName:""
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
        const Tf = sessionStorage.getItem('isExecutive')
        if(Tf === 'true'){
            setIsExecutive(true)
        }else{
            setIsExecutive(false)
        }

        if(forumId==='1'){
            axios.get(`/letter/company/${index.current}`)
            .then(res =>{
                if(res.data.success==false){
                    alert('접근불가능')
                }
                console.log(res.data)
                test.current = res.data.data
            if(test.current.maxPage !== data.maxPage){
                setData({
                    maxPage : res.data.data.maxPage,
                    rows:res.data.data.post_10.rows,
                    forumName:res.data.data.post_10.forumName

                })

            }
            })
            .catch(err =>console.log(err))
        }else if(forumId==='2'){
            axios.get(`/letter/battalion/${index.current}`)
            .then(res =>{
                if(res.data.success==false){
                    alert('접근불가능')
                }
                console.log(res.data)
                test.current = res.data.data
            if(test.current.maxPage !== data.maxPage){
                setData({
                    maxPage : res.data.data.maxPage,
                    rows:res.data.data.post_10.rows,
                    forumName:res.data.data.post_10.forumName
                })
            }
            })
            .catch(err =>console.log(err))
        }else{
            axios.get(`/community/${forumId}/${index.current}`)
            .then(res =>{
                console.log(res.data)
                
                test.current = res.data.data
            if(test.current.maxPage !== data.maxPage){
                setData({
                    maxPage : res.data.data.maxPage,
                    rows:res.data.data.post_10.rows,
                    forumName:res.data.data.post_10.forumName
                })
            }
            })
            .catch(err =>console.log(err))
        }
    },[data,index])

    const onRemove = (id)=>{
        axios.delete(`/community/${forumId}/v/${id}`)
        .then(res=>{
            console.log(res.data);
        })
    }

    const PageChange = (id)=>{
        index.current = id
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
          result.push(<button id={i} onClick={()=> PageChange(parseInt(i)+parseInt(1))} className="pageButton">{i+1}</button>  );
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

            result.push(
            <tr>  
                <th className='Nth1m' ><Link className='pageTitleLink' to={`/community/${forumId}/v/${res.id}`}>{res.title}{res.commentCount !== null ? (res.commentCount):null}</Link></th> 
                <th className='Nth2m'>{create}</th>    
                <th className='Nth3m'>{forumId!=='1'&&forumId!=='2' ?  res.User.name : "익명" }</th>    
            </tr>)
            return null
        })
        return result;
     }
     const [isExecutive,setIsExecutive] = useState(false)
     
     const delPage = ()=>{
        axios.delete(`/community/${forumId}`)
        .then(res=>{
            console.log(res.data)
        })
     }
    return (
        <div>
            { newpost===false ?
                //여기는 글안쓸때 화면
            <div>
                <>
                    <div id="entire">
                        <h2 className={styles.FnoticeH}>{data.forumName !==undefined ? data.forumName : 
                        forumId ==='1' ?  "중대 마음의 편지" : "대대 마음의 편지"
                        }  +</h2>
                        <div className='fContentBox'>
                            <div className='Fcontent'>
                                <div id="table">
                                    
                                    { <table className='Ntable'>
                                            <thead className='Nthead2'>
                                                <th className='Nth1'>    제목     </th>
                                                <th className='Nth2'>    날짜     </th>
                                                <th className='Nth3'>    작성자     </th>
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

                                    {sessionStorage.getItem('isExecutive')==='true' || data.forumName !== '공지사항' ?<button className='pageButton' onClick={()=>setNewpost(true)}>글쓰기</button>:null}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
            :
            <>
                <h2 className={styles.FnoticeH}>{data.forumName}  +</h2>
                <div className="NPcontent">
                    <div className="NPcontentTop">
                        <h3>제목 : </h3>
                        <input className = "NPinputOne"  name="title" value={title} onChange={onChange} placeholder="제목을 입력하십시오."/>
                    </div>
                    <div id="mainContent">
                    <CKEditor
                        editor={ ClassicEditor }
                        data={content}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setInputs({...inputs,content:data})
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                    } }
                />
                    </div>
                    <button  className="NPbuttonOne" onClick={onPost}>등록</button>
                    <button className="NPbuttonOne2"  onClick={()=>setNewpost(false)}>뒤로가기</button>
                </div>
            </>
            }
            {isExecutive === true ?
            
            <>
            <button onClick={delPage}>게시판 삭제하기</button>
            </>

        :null}
        </div>
    );
};

export default Page;