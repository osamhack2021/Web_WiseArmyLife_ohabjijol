import React from 'react';
import './Current.css';

const Current = () => {
    return (
        <div>
           <h2 className="peopleCheck">  인원확인 +  </h2>
            <table className="currentConfirm">
                <thead>
                    <tr>
                        <th>군번</th>  
                        <th>이름</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>20-12345678</td>
                        <td>홍길동</td>
                    </tr>
                </tbody>            
                </table>
        </div>
    );
};

export default Current;