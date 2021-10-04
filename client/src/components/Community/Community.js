import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Forum from './Forum';
import Post from './Post';
import Page from './Page';

// match.params 사용
// 
const Community = ({match}) => {
    
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/Community/:forumId/v/postIndex" component={Post} />
                    <Route path="/Community/:forumId/:page?" component={Page} />
                    <Route path="/Community" component={Forum}/>
                </Switch>
            </Router>
        </div>
    );
};

export default Community;