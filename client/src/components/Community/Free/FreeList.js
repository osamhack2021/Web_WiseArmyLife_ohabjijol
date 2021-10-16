import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import { Link } from 'react-router-dom'; 
import "./FreeList.css";



const FreeList = () => {

    const [data,setData] = useState({
        'count':100, // 100이면 오류
        'rows':[]
    });

    const {count,rows} = data;
    
    const [inputs,setInputs] = useState({
        FreeListName:''
    })
    
    const test = useRef(0);
    const {FreeListName} = inputs;

    useEffect(() => {
            axios.get('/Community')
            .then(res =>{
                console.log(res.data.data)
                test.current=res.data.data.allFreeList;
                if(test.current.count != data.count){
                    setData(test.current)
                }
            })
        }
    ,[data])

    const onClick = ()=>{
        axios.post('/Community/FreeListAdd',{
            'FreeListName':inputs.FreeListName
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

        <div id="FList">


       
    
       <h2 className="FLhTwo">자유게시판 +</h2>


       <div className="FLcontent">
           <div id="FreeListTable">
           { <table className = "FLtable">
                <thead className = "FLthead">
                    <th className = "FLth">    제목     </th>
                    <th className = "FLth">    날짜     </th>
                    <th className = "FLth">    작성자     </th>
                                  </thead>
              
                <tbody className = "FLtbody">
                    <tr>
                    <td className = "FLtdOne" >자유게시판 낙서 ㅎㅎ</td> 
                    <td className = "FLtd" >21.09.21</td> 
                    <td className = "FLtd" >김길동</td> 
                   
                    </tr>

                    <tr>
                    <td className = "FLtdOne" >에잇</td> 
                    <td className = "FLtd" >21.09.25</td> 
                    <td className = "FLtd" >이길동</td> 
                  
                    </tr>


                    <tr>  <td className = "FLtdOne" >몰라몰라</td> 
                    <td className = "FLtd">21.09.15</td> 
                    <td className = "FLtd" >고길동</td>    </tr>

                    <tr>  <td className = "FLtdOne" >비밀글입니다.</td> 
                    <td className = "FLtd"> 21.09.15</td>
                    <td className = "FLtd" >익명</td>     </tr>

                    <tr>  <td className = "FLtdOne">지금 밖에 화재경보기 울림...뭐야</td> 
                    <td className = "FLtd">21.09.15</td> 
                    <td className = "FLtd" >홍길동</td>    </tr>
                    
                    <tr>  <td className = "FLtdOne" >불났나봐....</td> 
                    <td className = "FLtd">21.09.15</td>
                    <td className = "FLtd" >파이어</td>     </tr>

                    <tr>  <td className = "FLtdOne" >나 사지방인데....</td> 
                    <td className = "FLtd">21.09.15</td>
                    <td className = "FLtd" >펭구</td>     </tr>

                    <tr>  <td className = "FLtdOne">도망가...?</td> 
                    <td className = "FLtd"> 21.09.15</td> 
                    <td className = "FLtd" >히어로</td>    </tr>

                    <tr>  <td className = "FLtdOne">비밀글입니다.</td> 
                    <td className = "FLtd">21.09.15</td>
                    <td className = "FLtd" >익명</td>     </tr>

                    <tr>  <td className = "FLbottomLineOne" >진짜면 어떡해...</td> 
                    <td className = "FLbottomLine">21.09.15</td>
                    <td className = "FLbottomLine" >오케이</td>     </tr>
                   
                                
                   
                </tbody>
            </table>
}
    
            </div>
        </div>

        <div className="FLselectBox">
                <button className="FLbuttonFirst">{"<"}</button>  
             <button className="FLbuttonOne" >1</button>  
             <button className="FLbuttonOne">2</button>  
             <button className="FLbuttonOne"> 3</button>  
             <button className="FLbuttonOne">4</button>  
             <button className="FLbuttonOne">5</button>  
             <button className="FLbuttonOne">{">"}</button>  
             <button className="FLbuttonTwo">글 작성</button>
             </div>
             </div>
             </>

        
    );
};


export default FreeList;
