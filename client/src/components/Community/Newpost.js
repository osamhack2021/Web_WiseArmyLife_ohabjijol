import React from 'react';
import axios from 'axios';

const Newpost = (props) => {

    const {onOne,forumId} = props

    
    
    
    return (
        <div>
            <input placeholder='title'/>
            <input placeholder='content' />
            <button onClick={onPost}>작성완료</button>
            <button onClick={onOne}>돌아가기</button>
        </div>
    );
};

export default Newpost;