import React,{useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Forum from './Forum';
import Post from './Post';
import Page from './Page';

// match.params 사용
// 
const Community = ({match}) => {



    return (
        <div>
            <h2>커뮤니티 + </h2>
            <Router>
                <Route exact path="/Community/:forumId/v/postIndex" component={Post} />
                <Route exact path="/Community/:forumId/:page?" component={Page} />
                <Route exact path="/Community" render={() => <Forum />} />
            </Router>
        </div>
    );
};

export default Community;