import React from 'react';
import "./mindLetter.css"

const Letter = () => {

    const hTwoStyle = {

    }

    return (
        <>
        <h1>마음의 편지+</h1>
        <button>중대</button>
        <button>대대</button> <br></br>
        <button>진행중인 글</button>       
        <button>완료된 글</button>

        <div className="content">
            <table>
                <thead>
                    <th>    제목     </th>
                    <th>    날짜     </th>
                    <th>    진행상태     </th>
                </thead>
                <tbody>
                    <td></td>
                </tbody>
            </table>
        </div>

        </>
    );
};

export default Letter;