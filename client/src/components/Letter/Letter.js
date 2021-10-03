import React, { Component } from 'react';
import BoardForm from '../Test/App6_BoardForm';

import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PublicRoute from './../../Custom/PublicRoute';
import LetterBoard from './LetterBoard';

/*
    component files.
*/
class Letter extends Component {

    
    render() {
        

        return (
            <div>
                <Router>
                    <Link to="/letter/post">글쓰기</Link>
                    <Switch>
                        <PublicRoute path="/letter/post" restricted={false} component={BoardForm} />
                        <PublicRoute path="/letter" restricted={false} component={LetterBoard} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Letter;

