import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import { Link } from 'react-router-dom'; 
import "./Forum.css";



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


        <>

        <div id="entire">


       
    
       <h2 className="FnoticeH">공지사항 +</h2>


       <div className="Fcontent">
           <div id="table">
           { <table className = "FNtable">
                <thead className = "FNthead">
                    <th className = "FNth">    제목     </th>
                    <th className = "FNth">    날짜     </th>
                                  </thead>
              
                <tbody className = "FNtbody">
                    <tr>
                    <td className = "FNtd" >군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd" >21.09.21</td> 
                   
                    </tr>

                    <tr>
                    <td className = "FNtd" >군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd" >21.09.25</td> 
                  
                    </tr>


                    <tr>  <td className = "FNtd" >군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd">21.09.15</td>    </tr>

                    <tr>  <td className = "FNtd" >군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd"> 21.09.15</td>    </tr>

                    <tr>  <td className = "FNtd">군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd">21.09.15</td>    </tr>
                    
                    <tr>  <td className = "FNtd" >군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd">21.09.15</td>    </tr>

                    <tr>  <td className = "FNtd" >군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd">21.09.15</td>    </tr>

                    <tr>  <td className = "FNtd">군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd"> 21.09.15</td>    </tr>

                    <tr>  <td className = "FNtd">군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FNtd">21.09.15</td>    </tr>

                    <tr>  <td className = "FbottomLine" >군장병 코로나 방역 수칙 안내</td> 
                    <td className = "FbottomLine">21.09.15</td>    </tr>
                   
                                
                   
                </tbody>
            </table>
}
    
            </div>
        </div>

        <div className="FselectBox">
                <button className="FbuttonOne">{"<"}</button>  
             <button className="FbuttonOne">1</button>  
             <button className="FbuttonOne">2</button>  
             <button className="FbuttonOne"> 3</button>  
             <button className="FbuttonOne">4</button>  
             <button className="FbuttonOne">5</button>  
             <button className="FbuttonOne">{">"}</button>  
             </div>
             </div>
             </>

        
    );
};


export default Forum;
