import React,{useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Forum from './Forum';
import Post from './Post';
import Page from './Page';
import './Community.css'

// match.params 사용
// 
const Community = ({match}) => {



    return (
        <div>
            <h2 className='fourmTitle'>커뮤니티 + </h2>
            <Router>
                <Route exact path="/Community/:forumId/v/postIndex" component={Post} />
                <Route exact path="/Community/:forumId/:page?" component={Page} />
                <Route exact path="/Community" component={Forum} />
            </Router>
        </div>
    );
};

export default Community;