import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

const Post = (props) => {

    const {id,ForumId,history} = props
    

    return (
        <div>
            <button onClick={()=>history.goBack()}>돌아가기</button>
        </div>
    );
};

export default Post;