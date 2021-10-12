import React from 'react';
import axios from 'axios';

const Newpost = (props) => {

    const {onOne,forumId} = props

    
    
    
    return (
        <div>
            <input placeholder='title'/>
            <input placeholder='content' />
        ㅇㅈㅈ암ㅇ즤
            <button onClick={onOne}>돌아가기</button>
        </div>
    );
};

export default Newpost;