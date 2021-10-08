import React from 'react';
import './Current.css';

const Current = () => {

const tableStyle = {
    borderBottom: "1px solid gray",
    width: "200px",
}


    return (
        <>
        <div className = "entire">
           <h2 className="peopleCheck">  인원확인 +  </h2>
          
            <table className="currentConfirm">
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

                <div className="selectBox">
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

export default Current;