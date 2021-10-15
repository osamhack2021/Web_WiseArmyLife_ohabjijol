import React,{useEffect,useState,useRef} from 'react';
import axios from 'axios';
import "./Letter.css";

const Letter = () => {

    const [data,setData] = useState(null)
    const test = useRef(null);

    useEffect(() => { //battalion or company
        axios.get('/letter/battalion')
        .then(res => {
            console.log(res.data)
            test.current = res.data.data;
            
        }
        )
        .catch()
    },[])

    const hTwoStyle = {
        fontSize:"24px",
        textAlign:"center",
      
    }

    const buttonOne = {
      border:"3px solid yellow",
      padding:"10px",
      margin:"10px",
      textAlign:"center",
      float:"center",
    }

    const tdStyle = {
      borderBottom:"1px solid gray",
      width:"300px",
      height:"32px",
    }

    const buttonTwo = {
      marginRight:"10px"

    }

    const thStyle = {
      hegight : "40px",
      paddingBottom: "10px",
      borderBottom:"1px solid white",
    }

  
    return (
        <>
        <div className="Ypage">
        <h2 style={hTwoStyle}>마음의 편지+</h2>

        <div className="Yscale">
        <button style={buttonOne}>중대</button>
        <button style={buttonOne}>대대</button> 
        
        
        </div>
      
        <button>진행중인 글</button>       
        <button>완료된 글</button>
        <br></br>


        <div className="Ycontent">
            <table className="Ytable">
                <thead>
                    <th style={thStyle}>    제목     </th>
                    <th style={thStyle}>    날짜     </th>
                    <th style={thStyle}>    진행상태     </th>
                </thead>
              
                <tbody >
                    <tr>
                    <td style={tdStyle}>비밀 글입니다.</td> 
                    <td style={tdStyle}>21.09.21</td> 
                    <td style={tdStyle}>확인완료</td> 
                    </tr>

                    <tr>
                    <td style={tdStyle}>비밀 글입니다.</td> 
                    <td style={tdStyle}>21.09.21</td> 
                    <td style={tdStyle}>확인완료</td> 
                    </tr>


                    <tr>
                    <td >비밀 글입니다.</td> 
                    <td>21.09.21</td> 
                    <td>확인완료</td> 
                    </tr>
                </tbody>
            </table>
        </div>
      
        <div className="YselectBox">
                <button style={buttonTwo}>{"<"}</button>  
             <button style={buttonTwo}>1</button>  
             <button style={buttonTwo}>2</button>  
             <button style={buttonTwo}> 3</button>  
             <button style={buttonTwo}>4</button>  
             <button style={buttonTwo}>5</button>  
             <button style={buttonTwo}>{">"}</button>  
             <button style={buttonTwo}>글 작성</button>
              
                </div>
</div>
        </>
    );
};

export default Letter;
