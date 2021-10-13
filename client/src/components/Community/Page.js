import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Post from './Post';
import styles from "./Forum.module.css";
import './Page.css'


const Page = ({match}) => {

    const forumId = match.url[11]
    const [data,setData] = useState({
        maxPage:999,
        post_10:{
            count:0,
            rows:[]
        }
    });
    const [newpost,setNewpost] =useState(false)
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
            console.log(res.data)
            test.current = res.data.data
            if(test.current.maxPage !== data.maxPage){
                setData(test.current)
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

    let index =0;


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

    const  Ntable = {
        borderTop: "3px solid black",
        borderBottom: "3px solid black",
        width: "1140px",
        textAlign:"center",
                marginLeft:" 0px",
        fontSize: "30px",
        fontFamily: "Nanum Square EB",
       
      }
    
      const  Nthead = {
        paddingTop:"20px",
        paddingBottom:"20px",
    
      }
    
      const  Nth = {
        height : "40px",
        paddingBottom: "10px",
        borderBottom:"1px solid white",
      }
    
      const  Ntbody = {
        fontSize:"25px",
        fontFamily: "Nanum Square B",
        paddingTop:"20px",
        paddingBottom:"20px",
    
      }
    
      const  Ntd = {
        paddingTop:"20px",
        paddingBottom:"20px",
        borderBottom: "1px solid gray",  
      }
    return (
        <div>
            { newpost===false ?
                //여기는 글안쓸때 화면
            <div>
                <h2>게시판 +</h2>
                
                (


<>

<div id="entire">




<h2 className={styles.FnoticeH}>공지사항 +</h2>


<div className={styles.Fcontent}>
<div id="table">
{ <table style={Ntable}>
        <thead style={Nthead}>
            <th style={Nth}>    제목     </th>
            <th style={Nth}>    날짜     </th>
                        </thead>
    
        <tbody style={Ntbody}>
            <tr>
            <td style={Ntd} >군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd} >21.09.21</td> 
        
            </tr>

            <tr>
            <td style={Ntd} >군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd} >21.09.25</td> 
        
            </tr>


            <tr>  <td style={Ntd} >군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd}>21.09.15</td>    </tr>

            <tr>  <td style={Ntd} >군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd}> 21.09.15</td>    </tr>

            <tr>  <td style={Ntd}>군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd}>21.09.15</td>    </tr>
            
            <tr>  <td style={Ntd} >군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd}>21.09.15</td>    </tr>

            <tr>  <td style={Ntd} >군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd}>21.09.15</td>    </tr>

            <tr>  <td style={Ntd}>군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd}> 21.09.15</td>    </tr>

            <tr>  <td style={Ntd}>군장병 코로나 방역 수칙 안내</td> 
            <td style={Ntd}>21.09.15</td>    </tr>

            <tr>  <td style={bottomLine} >군장병 코로나 방역 수칙 안내</td> 
            <td style={bottomLine}>21.09.15</td>    </tr>
        
                        
        
        </tbody>
    </table>
}

    </div>
</div>

<div className={styles.FselectBox}>
        <button>{"<"}</button>  
    <button >1</button>  
    <button >2</button>  
    <button > 3</button>  
    <button >4</button>  
    <button>5</button>  
    <button>{">"}</button>  
    </div>
    </div>
    </>


);
                
                <h1>dwdawawd</h1>
                <div>
                    {data.post_10.rows.map(res=>{
                        return(
                            <div>
                                <Link to={`/community/${forumId}/v/${res.id}`}>{res.title}</Link>
                            </div>
                        )
                    })}
                </div>
                
                <div>
                    <button onClick={()=>setNewpost(true)}>글쓰기</button>
                </div>
                <Link to={`/community`}>포럼으로</Link>
            </div>
            :
                // 여기부터 글쓰기화면
            <div>
                <div>글을쓰자 !! </div>
                <input placeholder='title' name="title" value={title} onChange={onChange}/>
                <input placeholder='content' name="content" value={content} onChange={onChange}/>
                <button onClick={onPost}>작성완료</button>
                <button onClick={()=>setNewpost(false)}>뒤로가기</button>

            </div>
            }
            
        </div>
    );
};

export default Page;