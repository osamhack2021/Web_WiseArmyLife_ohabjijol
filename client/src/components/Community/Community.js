import React,{useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Forum from './Forum';
import Post from './Post';
import Page from './Page';
import './Community.css'
import Newpost from './Newpost';

// match.params 사용
// 
const Community = ({match}) => {



    return (
        <div>
            <Route exact path="/Community/newpost" render={(props)=> <Newpost key={props.match.params.id} />} />
            <Route exact path="/Community/:forumId/:page?" component={Page} />
            <Route exact path="/Community" component={Forum} />
        </div>
    );
};

export default Community;