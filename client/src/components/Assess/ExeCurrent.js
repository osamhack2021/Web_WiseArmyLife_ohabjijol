import React from 'react';
import './ExeCurrent.css';

const ExeCurrent = () => {

    const tableStyle = {
        borderBottom: "1px solid gray",
        width: "200px",
    }

    return (
        <>
        <div className = "ECentire">
           <h2 className="ECpeopleCheck">  인원확인 +  </h2>
          
            <table className="ECcurrentConfirm">
                <thead>
                    <tr>
                        <th style={tableStyle}>군번</th>  
                        <th style={tableStyle}>이름</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={tableStyle}>20-12345678</td>
                        <td style={tableStyle}>홍길동</td>
                    </tr>
                    <tr>
                        <td style={tableStyle}>20-0124816</td>
                        <td style={tableStyle}>둘리</td>
                    </tr>
                </tbody>            
                </table>


                </div>

                <div className="ECselectBox">
                <button>{"<"}</button>  
             <button>1</button>  
             <button>2</button>  
             <button>3</button>  
             <button>4</button>  
             <button>5</button>  
             <button>{">"}</button>  
                </div>
{/* 일단 그냥 이렇게 해놀겡 */}

           
        
      

        </>
    );
};

export default ExeCurrent;

// 여기용진