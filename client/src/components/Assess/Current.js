import React from 'react';
import './Current.css';

const Current = () => {

const tableStyle = {
    borderBottom: "1px solid gray",
    width: "200px",
}

const numberStyle = {
    paddingRight: "10px",
    fontSize: "21px",
    margin: "20px",
   


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
                <div className="container">
                  <p style={numberStyle}>1</p>
                  <p style={numberStyle}>2</p>
                  <p style={numberStyle}>3</p>
                  <p style={numberStyle}>4</p>
                  <p style={numberStyle}>5</p>
                </div>
                </div>
{/* 일단 그냥 이렇게 해놀겡 */}

           
        
      

        </>
    );
};

export default Current;