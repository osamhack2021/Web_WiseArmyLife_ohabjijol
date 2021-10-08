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
                <Switch>
                    <Route path="/Community/:forumId/v/postIndex" component={Post} />
                    <Route path="/Community/:forumId/:page?" component={Page} />
                    <Route path="/Community" render={() => <Forum />} />
                </Switch>
            </Router>
        </div>
    );
};


export default Community;

