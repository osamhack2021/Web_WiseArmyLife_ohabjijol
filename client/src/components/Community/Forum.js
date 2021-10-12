import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import { Link } from 'react-router-dom'; 
import styles from "./Forum.module.css";



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
};


export default Forum;
