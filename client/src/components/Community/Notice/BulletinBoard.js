import React from 'react';
import "./BulletinBoard.css";

const BulletinBoard = () => {

    
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


       
       <h2 style={hTwoStyle} >공지사항 +</h2>

       <div className="Ycontent">
            <table className="Ytable">
                <thead>
                    <th style={thStyle}>    제목     </th>
                    <th style={thStyle}>    날짜     </th>
                                  </thead>
              
                <tbody >
                    <tr>
                    <td style={tdStyle}>비밀 글입니다.</td> 
                    <td style={tdStyle}>21.09.21</td> 
                   
                    </tr>

                    <tr>
                    <td style={tdStyle}>비밀 글입니다.</td> 
                    <td style={tdStyle}>21.09.21</td> 
                  
                    </tr>


                    <tr>
                    <td >비밀 글입니다.</td> 
                    <td>21.09.21</td> 
               
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
             </div>

             </>

        
              

       
       
       
       
       
       
       
       
       
     
    );
};


export default BulletinBoard;

